import { env } from "@/server/env";

export const AUTH_COOKIE_NAME = env.isProduction ? "__Host-token" : "token";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 8, // 8 hours — align with backend token expiry
};
