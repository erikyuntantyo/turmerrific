/**
 * @jest-environment node
 */
import { SignJWT } from "jose";

const TEST_SECRET = "a".repeat(32);

jest.mock("@/server/logging/logger", () => ({
  logger: { warn: jest.fn(), info: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

function mockFetchOnce(response: { ok: boolean; status?: number; body?: unknown }) {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: response.ok,
    status: response.status ?? (response.ok ? 200 : 400),
    json: async () => response.body ?? {},
  } as Response);
}

describe("authService", () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = TEST_SECRET;
    process.env.BACKEND_URL = "https://api.example.com";
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("login", () => {
    it("returns parsed LoginResponse on 200 with valid schema", async () => {
      mockFetchOnce({
        ok: true,
        body: {
          user: { id: "u1", email: "a@b.com", name: "A", role: "user" },
          token: "tok-123",
        },
      });
      const { authService } = require("@/features/auth/services/auth.service");
      const result = await authService.login({ email: "a@b.com", password: "secret123" });
      expect(result.user.id).toBe("u1");
      expect(result.token).toBe("tok-123");
    });

    it("throws on 401 with backend error message", async () => {
      mockFetchOnce({ ok: false, status: 401, body: { error: "Bad password" } });
      const { authService } = require("@/features/auth/services/auth.service");
      await expect(authService.login({ email: "a@b.com", password: "wrong" })).rejects.toThrow(
        "Bad password",
      );
    });

    it("throws generic message on 500 without body", async () => {
      mockFetchOnce({ ok: false, status: 500, body: {} });
      const { authService } = require("@/features/auth/services/auth.service");
      await expect(authService.login({ email: "a@b.com", password: "x" })).rejects.toThrow(
        "Invalid credentials",
      );
    });

    it("throws when backend response shape is invalid (Zod fails)", async () => {
      mockFetchOnce({
        ok: true,
        body: { user: { id: "u1" }, token: "tok-123" },
      });
      const { authService } = require("@/features/auth/services/auth.service");
      await expect(authService.login({ email: "a@b.com", password: "x" })).rejects.toThrow(
        /Invalid response from authentication server/,
      );
    });
  });

  describe("verifySession", () => {
    it("returns payload for valid token", async () => {
      const token = await new SignJWT({
        sub: "u1",
        email: "a@b.com",
        name: "A",
        role: "user",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(TEST_SECRET));

      const { authService } = require("@/features/auth/services/auth.service");
      const payload = await authService.verifySession(token);
      expect(payload.sub).toBe("u1");
    });
  });

  describe("logout", () => {
    it("posts to backend with Bearer token and returns { success: true }", async () => {
      mockFetchOnce({ ok: true, body: {} });
      const { authService } = require("@/features/auth/services/auth.service");
      const result = await authService.logout("tok-123");
      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.example.com/auth/logout",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer tok-123",
          }),
        }),
      );
    });

    it("returns { success: true } even when backend fetch throws (cookie still cleared)", async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error("network down"));
      const { authService } = require("@/features/auth/services/auth.service");
      const result = await authService.logout("tok-123");
      expect(result.success).toBe(true);
    });
  });
});
