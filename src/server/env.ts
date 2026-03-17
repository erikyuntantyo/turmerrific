import { logger } from "@/server/logging/logger";

let validated = false;

function validate(): void {
  if (validated) return;

  const isDev = process.env.NODE_ENV !== "production";

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.length < 32) {
    if (isDev) {
      logger.warn(
        "JWT_SECRET is missing or too short — using dev fallback. Set it in .env.local for auth.",
      );
    } else {
      throw new Error("[Env Configuration Error] JWT_SECRET must be at least 32 characters");
    }
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    if (isDev) {
      logger.warn("BACKEND_URL is missing — using dev fallback. Set it in .env.local for auth.");
    } else {
      throw new Error("[Env Configuration Error] BACKEND_URL is required");
    }
  } else {
    try {
      new URL(backendUrl);
    } catch {
      throw new Error("[Env Configuration Error] BACKEND_URL must be a valid URL");
    }
  }

  validated = true;
}

const DEV_JWT_SECRET = "dev-only-secret-do-not-use-in-production!!";
const DEV_BACKEND_URL = "http://localhost:3030";

export const env = {
  get jwtSecret(): string {
    validate();
    return process.env.JWT_SECRET || DEV_JWT_SECRET;
  },
  get backendUrl(): string {
    validate();
    return process.env.BACKEND_URL || DEV_BACKEND_URL;
  },
  get nodeEnv(): string {
    return process.env.NODE_ENV || "development";
  },
  get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  },
} as const;

export type Env = typeof env;
