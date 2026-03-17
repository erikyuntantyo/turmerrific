import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { z } from "zod";
import { env } from "@/server/env";
import { ROLES } from "./types/auth.types";
import type { AuthPayload } from "./types/auth.types";
import { TokenExpiredError, InvalidTokenError } from "./types/auth.types";

const authPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(ROLES),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

function getSecret() {
  return new TextEncoder().encode(env.jwtSecret);
}

export async function verifyToken(token: string): Promise<AuthPayload> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
      clockTolerance: "5s",
    });

    const result = authPayloadSchema.safeParse(payload);
    if (!result.success) {
      throw new InvalidTokenError();
    }

    return result.data;
  } catch (error) {
    if (error instanceof JWTExpired) {
      throw new TokenExpiredError();
    }
    if (error instanceof InvalidTokenError) {
      throw error;
    }
    throw new InvalidTokenError();
  }
}

export async function verifyTokenSafe(
  token: string,
): Promise<{ success: true; payload: AuthPayload } | { success: false; error: Error }> {
  try {
    const payload = await verifyToken(token);
    return { success: true, payload };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
