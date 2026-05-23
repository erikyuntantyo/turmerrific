/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

jest.mock("@/server/logging/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock("@/server/auth/rate-limit", () => ({
  checkRateLimit: jest.fn(),
}));

jest.mock("@/features/auth/services/auth.service", () => ({
  authService: {
    login: jest.fn(),
  },
}));

function mkRequest(body: unknown, init: RequestInit = {}): NextRequest {
  const headers = new Headers({
    "content-type": "application/json",
    "x-forwarded-for": "1.2.3.4",
    ...(init.headers as Record<string, string>),
  });
  return new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/auth/login", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = "a".repeat(32);
    process.env.BACKEND_URL = "https://api.example.com";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  function setup() {
    const { checkRateLimit } = require("@/server/auth/rate-limit");
    const { authService } = require("@/features/auth/services/auth.service");
    (checkRateLimit as jest.Mock).mockReturnValue({ allowed: true, retryAfterSeconds: 0 });
    return { checkRateLimit, authService };
  }

  it("returns 200 + sets cookie on valid credentials", async () => {
    const { authService } = setup();
    (authService.login as jest.Mock).mockResolvedValue({
      user: { id: "u1", email: "a@b.com", name: "A", role: "user" },
      token: "tok-123",
    });

    const { POST } = require("@/app/api/auth/login/route");
    const res = await POST(mkRequest({ email: "a@b.com", password: "secret123" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user.email).toBe("a@b.com");
    expect(res.cookies.get("token")?.value).toBe("tok-123");
  });

  it("returns 415 when content-type is not application/json", async () => {
    setup();
    const { POST } = require("@/app/api/auth/login/route");
    const res = await POST(
      mkRequest("email=a@b.com&password=secret123", {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }),
    );
    expect(res.status).toBe(415);
  });

  it("returns 400 on schema failure (invalid email)", async () => {
    setup();
    const { POST } = require("@/app/api/auth/login/route");
    const res = await POST(mkRequest({ email: "not-an-email", password: "secret123" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/email/i);
  });

  it("returns 400 on schema failure (password < 8 chars)", async () => {
    setup();
    const { POST } = require("@/app/api/auth/login/route");
    const res = await POST(mkRequest({ email: "a@b.com", password: "short" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/8 characters/i);
  });

  it("returns 429 with Retry-After header when rate-limited", async () => {
    const { checkRateLimit } = setup();
    (checkRateLimit as jest.Mock).mockReturnValue({ allowed: false, retryAfterSeconds: 42 });
    const { POST } = require("@/app/api/auth/login/route");
    const res = await POST(mkRequest({ email: "a@b.com", password: "secret123" }));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("42");
  });

  it("returns 401 when backend login fails", async () => {
    const { authService } = setup();
    (authService.login as jest.Mock).mockRejectedValue(new Error("Bad password"));
    const { POST } = require("@/app/api/auth/login/route");
    const res = await POST(mkRequest({ email: "a@b.com", password: "wrongpass1" }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.success).toBe(false);
  });
});
