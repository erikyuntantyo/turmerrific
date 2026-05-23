/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

jest.mock("@/server/logging/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

function mkRequest(pathname: string, cookieValue?: string): NextRequest {
  const headers = new Headers();
  if (cookieValue) headers.set("cookie", `token=${cookieValue}`);
  return new NextRequest(`http://localhost:3000${pathname}`, { headers });
}

describe("proxy.ts", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = "a".repeat(32);
    process.env.BACKEND_URL = "https://api.example.com";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns next() for any path when protectedPaths is empty (default starter-kit behavior)", async () => {
    const { proxy } = require("@/proxy");
    const res = await proxy(mkRequest("/dashboard"));
    // NextResponse.next() returns x-middleware-next header
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it("returns next() for /api/* paths (early bypass even if path were marked protected)", async () => {
    const { proxy } = require("@/proxy");
    const res = await proxy(mkRequest("/api/users"));
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it("exports a matcher config targeting /dashboard/:path*", () => {
    const { config } = require("@/proxy");
    expect(config.matcher).toEqual(["/dashboard/:path*"]);
  });
});
