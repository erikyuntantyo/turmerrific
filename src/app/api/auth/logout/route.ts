import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/server/auth/auth.cookie";
import { authService } from "@/features/auth/services/auth.service";
import { logger } from "@/server/logging/logger";

export async function POST(request: NextRequest) {
  logger.info("Logout");

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (token) {
    await authService.logout(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(AUTH_COOKIE_NAME);

  return response;
}
