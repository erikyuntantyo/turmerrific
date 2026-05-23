describe("AUTH_COOKIE_NAME + AUTH_COOKIE_OPTIONS", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.JWT_SECRET = "a".repeat(32);
    process.env.BACKEND_URL = "https://api.example.com";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("uses __Host- prefix in production", () => {
    process.env.NODE_ENV = "production";
    const { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } = require("@/server/auth/auth.cookie");
    expect(AUTH_COOKIE_NAME).toBe("__Host-token");
    expect(AUTH_COOKIE_OPTIONS.secure).toBe(true);
  });

  it("uses plain name in development", () => {
    process.env.NODE_ENV = "development";
    const { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } = require("@/server/auth/auth.cookie");
    expect(AUTH_COOKIE_NAME).toBe("token");
    expect(AUTH_COOKIE_OPTIONS.secure).toBe(false);
  });

  it("always sets httpOnly + sameSite=lax + path=/ + 8h maxAge", () => {
    process.env.NODE_ENV = "production";
    const { AUTH_COOKIE_OPTIONS } = require("@/server/auth/auth.cookie");
    expect(AUTH_COOKIE_OPTIONS.httpOnly).toBe(true);
    expect(AUTH_COOKIE_OPTIONS.sameSite).toBe("lax");
    expect(AUTH_COOKIE_OPTIONS.path).toBe("/");
    expect(AUTH_COOKIE_OPTIONS.maxAge).toBe(60 * 60 * 8);
  });
});
