jest.mock("@/server/logging/logger", () => ({
  logger: { warn: jest.fn(), info: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

describe("checkRateLimit", () => {
  let checkRateLimit: typeof import("@/server/auth/rate-limit").checkRateLimit;

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-05-23T00:00:00Z"));
    checkRateLimit = require("@/server/auth/rate-limit").checkRateLimit;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("allows requests under the 5-attempt limit", () => {
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit("1.1.1.1");
      expect(result.allowed).toBe(true);
    }
  });

  it("blocks 6th request within window and returns retryAfter > 0", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("2.2.2.2");
    const blocked = checkRateLimit("2.2.2.2");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(blocked.retryAfterSeconds).toBeLessThanOrEqual(15 * 60);
  });

  it("isolates rate limits per IP", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("3.3.3.3");
    expect(checkRateLimit("3.3.3.3").allowed).toBe(false);
    expect(checkRateLimit("4.4.4.4").allowed).toBe(true);
  });

  it("resets after window (15 min) elapses", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("5.5.5.5");
    expect(checkRateLimit("5.5.5.5").allowed).toBe(false);

    jest.advanceTimersByTime(15 * 60 * 1000 + 1000);

    expect(checkRateLimit("5.5.5.5").allowed).toBe(true);
  });

  it("logs warn on block", () => {
    const { logger } = require("@/server/logging/logger");
    for (let i = 0; i < 5; i++) checkRateLimit("6.6.6.6");
    checkRateLimit("6.6.6.6");
    expect(logger.warn).toHaveBeenCalledWith(
      "Rate limit exceeded",
      expect.objectContaining({ ip: "6.6.6.6" }),
    );
  });
});
