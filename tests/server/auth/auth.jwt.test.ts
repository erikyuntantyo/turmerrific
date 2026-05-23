/**
 * @jest-environment node
 */
import { SignJWT } from "jose";

const TEST_SECRET = "a".repeat(32);

async function makeToken(
  payload: Record<string, unknown>,
  overrides: { expiresIn?: string; signWith?: Uint8Array; alg?: string } = {},
): Promise<string> {
  const secret = overrides.signWith ?? new TextEncoder().encode(TEST_SECRET);
  const alg = overrides.alg ?? "HS256";
  let signer = new SignJWT(payload).setProtectedHeader({ alg }).setIssuedAt();
  if (overrides.expiresIn) signer = signer.setExpirationTime(overrides.expiresIn);
  return signer.sign(secret);
}

describe("verifyToken", () => {
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

  it("decodes a valid token", async () => {
    const { verifyToken } = require("@/server/auth/auth.jwt");
    const token = await makeToken(
      { sub: "u1", email: "a@b.com", name: "A", role: "user" },
      { expiresIn: "1h" },
    );

    const payload = await verifyToken(token);
    expect(payload.sub).toBe("u1");
    expect(payload.email).toBe("a@b.com");
    expect(payload.role).toBe("user");
  });

  it("throws TokenExpiredError on expired token", async () => {
    const { verifyToken } = require("@/server/auth/auth.jwt");
    const { TokenExpiredError } = require("@/server/auth/types/auth.types");
    const past = Math.floor(Date.now() / 1000) - 60 * 60;
    const token = await new SignJWT({
      sub: "u1",
      email: "a@b.com",
      name: "A",
      role: "user",
      exp: past,
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(TEST_SECRET));

    await expect(verifyToken(token)).rejects.toBeInstanceOf(TokenExpiredError);
  });

  it("throws InvalidTokenError on malformed token", async () => {
    const { verifyToken } = require("@/server/auth/auth.jwt");
    const { InvalidTokenError } = require("@/server/auth/types/auth.types");
    await expect(verifyToken("not-a-jwt")).rejects.toBeInstanceOf(InvalidTokenError);
  });

  it("throws InvalidTokenError when signed with wrong secret", async () => {
    const { verifyToken } = require("@/server/auth/auth.jwt");
    const { InvalidTokenError } = require("@/server/auth/types/auth.types");
    const token = await makeToken(
      { sub: "u1", email: "a@b.com", name: "A", role: "user" },
      { expiresIn: "1h", signWith: new TextEncoder().encode("b".repeat(32)) },
    );
    await expect(verifyToken(token)).rejects.toBeInstanceOf(InvalidTokenError);
  });

  it("throws InvalidTokenError when payload schema is invalid (missing fields)", async () => {
    const { verifyToken } = require("@/server/auth/auth.jwt");
    const { InvalidTokenError } = require("@/server/auth/types/auth.types");
    const token = await makeToken({ sub: "u1" }, { expiresIn: "1h" });
    await expect(verifyToken(token)).rejects.toBeInstanceOf(InvalidTokenError);
  });

  it("throws InvalidTokenError when role is not in ROLES enum", async () => {
    const { verifyToken } = require("@/server/auth/auth.jwt");
    const { InvalidTokenError } = require("@/server/auth/types/auth.types");
    const token = await makeToken(
      { sub: "u1", email: "a@b.com", name: "A", role: "superadmin" },
      { expiresIn: "1h" },
    );
    await expect(verifyToken(token)).rejects.toBeInstanceOf(InvalidTokenError);
  });
});
