import { NextRequest, NextResponse } from "next/server";
import { verifyTokenSafe } from "@/server/auth/auth.jwt";
import { AUTH_COOKIE_NAME } from "@/server/auth/auth.cookie";
import { logger } from "@/server/logging/logger";

const protectedPaths = ["/dashboard", "/users", "/settings"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  if (!isProtected) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    logger.debug("No token found, redirecting to login", { pathname });
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const result = await verifyTokenSafe(token);

  if (!result.success) {
    logger.debug("Token verification failed, redirecting to login", {
      pathname,
      error: result.error?.name,
    });

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*", "/settings/:path*"],
};
