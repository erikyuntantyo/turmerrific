describe("env", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns valid env values when JWT_SECRET and BACKEND_URL are set correctly", () => {
    process.env.NODE_ENV = "production";
    process.env.JWT_SECRET = "a".repeat(32);
    process.env.BACKEND_URL = "https://api.example.com";

    const { env } = require("@/server/env");
    expect(env.jwtSecret).toBe("a".repeat(32));
    expect(env.backendUrl).toBe("https://api.example.com");
    expect(env.isProduction).toBe(true);
  });

  it("throws in production when JWT_SECRET is missing or too short", () => {
    process.env.NODE_ENV = "production";
    process.env.JWT_SECRET = "short";
    process.env.BACKEND_URL = "https://api.example.com";

    const { env } = require("@/server/env");
    expect(() => env.jwtSecret).toThrow(/JWT_SECRET must be at least 32 characters/);
  });

  it("throws in production when BACKEND_URL is not a valid URL", () => {
    process.env.NODE_ENV = "production";
    process.env.JWT_SECRET = "a".repeat(32);
    process.env.BACKEND_URL = "not-a-url";

    const { env } = require("@/server/env");
    expect(() => env.backendUrl).toThrow(/BACKEND_URL must be a valid URL/);
  });
});
