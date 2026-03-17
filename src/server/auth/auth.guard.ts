import { NextRequest } from "next/server";
import { verifyToken } from "./auth.jwt";
import { AUTH_COOKIE_NAME } from "./auth.cookie";
import type { AuthPayload, Role } from "./types/auth.types";
import { ForbiddenError, InvalidTokenError } from "./types/auth.types";

export async function getAuthenticatedUser(request: NextRequest): Promise<AuthPayload> {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    throw new InvalidTokenError();
  }
  return verifyToken(token);
}

export async function requireRole(
  request: NextRequest,
  allowedRoles: Role[],
): Promise<AuthPayload> {
  const user = await getAuthenticatedUser(request);
  if (!allowedRoles.includes(user.role)) {
    throw new ForbiddenError(`Access denied. Required role: ${allowedRoles.join(" or ")}`);
  }
  return user;
}
