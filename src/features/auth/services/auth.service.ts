import { z } from "zod";
import { verifyToken } from "@/server/auth/auth.jwt";
import { env } from "@/server/env";
import { logger } from "@/server/logging/logger";
import { ROLES, InvalidTokenError, AUTH_ERROR_CODES } from "@/server/auth/types/auth.types";
import type { AuthPayload, LoginCredentials, LoginResponse } from "@/server/auth/types/auth.types";

const loginResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    role: z.enum(ROLES),
  }),
  token: z.string(),
});

async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const res = await fetch(`${env.backendUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    logger.warn("Login failed", { email: credentials.email, status: res.status });
    throw new Error(data.error || "Invalid credentials");
  }

  const json: unknown = await res.json();
  const result = loginResponseSchema.safeParse(json);

  if (!result.success) {
    logger.error("Backend returned invalid login response", {
      errors: result.error.errors,
    });
    throw new Error("Invalid response from authentication server");
  }

  return result.data;
}

async function verifySession(token: string): Promise<AuthPayload> {
  try {
    return await verifyToken(token);
  } catch {
    throw new InvalidTokenError();
  }
}

async function logout(token: string): Promise<{ success: boolean }> {
  try {
    await fetch(`${env.backendUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    logger.warn("Backend session invalidation failed — cookie will still be deleted", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  return { success: true };
}

export const authService = {
  login,
  verifySession,
  logout,
  ERROR_CODES: AUTH_ERROR_CODES,
};
