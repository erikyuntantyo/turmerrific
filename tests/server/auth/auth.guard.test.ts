/**
 * @jest-environment node
 */
import { SignJWT } from "jose";
import { NextRequest } from "next/server";

const TEST_SECRET = "a".repeat(32);

async function signedToken(
  payload: Record<string, unknown>,
  expiresIn = "1h",
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(TEST_SECRET));
}

function mkRequest(cookieValue?: string): NextRequest {
  const headers = new Headers();
  if (cookieValue) headers.set("cookie", `token=${cookieValue}`);
  return new NextRequest("http://localhost:3000/", { headers });
}

describe("auth.guard", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = TEST_SECRET;
    process.env.BACKEND_URL = "https://api.example.com";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("getAuthenticatedUser returns payload when valid token cookie present", async () => {
    const { getAuthenticatedUser } = require("@/server/auth/auth.guard");
    const token = await signedToken({
      sub: "u1",
      email: "a@b.com",
      name: "A",
      role: "user",
    });
    const req = mkRequest(token);
    const user = await getAuthenticatedUser(req);
    expect(user.role).toBe("user");
  });

  it("getAuthenticatedUser throws InvalidTokenError when cookie missing", async () => {
    const { getAuthenticatedUser } = require("@/server/auth/auth.guard");
    const { InvalidTokenError } = require("@/server/auth/types/auth.types");
    await expect(getAuthenticatedUser(mkRequest())).rejects.toBeInstanceOf(InvalidTokenError);
  });

  it("requireRole returns user when role is in allowedRoles", async () => {
    const { requireRole } = require("@/server/auth/auth.guard");
    const token = await signedToken({
      sub: "u1",
      email: "a@b.com",
      name: "Admin",
      role: "admin",
    });
    const user = await requireRole(mkRequest(token), ["admin"]);
    expect(user.role).toBe("admin");
  });

  it("requireRole throws ForbiddenError when role not in allowedRoles", async () => {
    const { requireRole } = require("@/server/auth/auth.guard");
    const { ForbiddenError } = require("@/server/auth/types/auth.types");
    const token = await signedToken({
      sub: "u1",
      email: "a@b.com",
      name: "User",
      role: "user",
    });
    await expect(requireRole(mkRequest(token), ["admin"])).rejects.toBeInstanceOf(ForbiddenError);
  });
});
