import { logger } from "@/server/logging/logger";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

const attempts = new Map<string, number[]>();

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

function cleanup(): void {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  for (const [key, timestamps] of attempts) {
    const valid = timestamps.filter((t) => t > cutoff);
    if (valid.length === 0) {
      attempts.delete(key);
    } else {
      attempts.set(key, valid);
    }
  }
}

setInterval(cleanup, CLEANUP_INTERVAL_MS).unref();

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  const timestamps = (attempts.get(ip) ?? []).filter((t) => t > cutoff);
  timestamps.push(now);
  attempts.set(ip, timestamps);

  if (timestamps.length > MAX_ATTEMPTS) {
    const oldestInWindow = timestamps[0];
    const retryAfterSeconds = Math.ceil((oldestInWindow + WINDOW_MS - now) / 1000);

    logger.warn("Rate limit exceeded", { ip, attempts: timestamps.length });

    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
