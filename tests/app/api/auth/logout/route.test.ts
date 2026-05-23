/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

jest.mock("@/server/logging/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock("@/features/auth/services/auth.service", () => ({
  authService: {
    logout: jest.fn(),
  },
}));

function mkRequest(cookieValue?: string): NextRequest {
  const headers = new Headers();
  if (cookieValue) headers.set("cookie", `token=${cookieValue}`);
  return new NextRequest("http://localhost:3000/api/auth/logout", {
    method: "POST",
    headers,
  });
}

describe("POST /api/auth/logout", () => {
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

  it("returns 200 and calls authService.logout when token cookie present", async () => {
    const { authService } = require("@/features/auth/services/auth.service");
    (authService.logout as jest.Mock).mockResolvedValue({ success: true });

    const { POST } = require("@/app/api/auth/logout/route");
    const res = await POST(mkRequest("tok-123"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(authService.logout).toHaveBeenCalledWith("tok-123");
  });

  it("returns 200 and skips authService.logout when no cookie", async () => {
    const { authService } = require("@/features/auth/services/auth.service");

    const { POST } = require("@/app/api/auth/logout/route");
    const res = await POST(mkRequest());
    expect(res.status).toBe(200);
    expect(authService.logout).not.toHaveBeenCalled();
  });

  it("deletes the auth cookie on response (Max-Age=0 / Expires past)", async () => {
    const { authService } = require("@/features/auth/services/auth.service");
    (authService.logout as jest.Mock).mockResolvedValue({ success: true });

    const { POST } = require("@/app/api/auth/logout/route");
    const res = await POST(mkRequest("tok-123"));
    const setCookie = res.headers.get("set-cookie") ?? "";
    expect(setCookie.toLowerCase()).toContain("token=");
    expect(setCookie).toMatch(/Max-Age=0|Expires=/);
  });
});
