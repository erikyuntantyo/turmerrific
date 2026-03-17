import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/server/auth/auth.cookie";
import { authService } from "@/features/auth/services/auth.service";
import { checkRateLimit } from "@/server/auth/rate-limit";
import { toApiError, AUTH_ERROR_CODES } from "@/server/auth/types/auth.types";
import { logger } from "@/server/logging/logger";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    const { allowed, retryAfterSeconds } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Please try again later.",
          code: AUTH_ERROR_CODES.RATE_LIMITED,
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) },
        },
      );
    }

    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error: "Content-Type must be application/json",
          code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
        },
        { status: 415 },
      );
    }

    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.errors[0].message,
          code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
        },
        { status: 400 },
      );
    }

    logger.info("Login attempt", { email: result.data.email });

    const loginResult = await authService.login(result.data);
    const response = NextResponse.json({ success: true, user: loginResult.user });
    response.cookies.set(AUTH_COOKIE_NAME, loginResult.token, AUTH_COOKIE_OPTIONS);

    return response;
  } catch (error) {
    const apiError = toApiError(error as Error);
    return NextResponse.json(
      { success: false, error: apiError.error, code: apiError.code },
      { status: 401 },
    );
  }
}
