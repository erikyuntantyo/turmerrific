export const ROLES = ["admin", "user"] as const;
export type Role = (typeof ROLES)[number];

export interface AuthPayload {
  sub: string;
  email: string;
  name: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: { id: string; email: string; name: string; role: Role };
  token: string;
}

export const AUTH_ERROR_CODES = {
  UNAUTHORIZED: "AUTH_UNAUTHORIZED",
  FORBIDDEN: "AUTH_FORBIDDEN",
  TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
  INVALID_TOKEN: "AUTH_INVALID_TOKEN",
  INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  RATE_LIMITED: "AUTH_RATE_LIMITED",
  SERVER_ERROR: "AUTH_SERVER_ERROR",
} as const;

export class TokenExpiredError extends Error {
  constructor() {
    super("Token has expired");
    this.name = "TokenExpiredError";
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super("Invalid token");
    this.name = "InvalidTokenError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Access denied") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export function toApiError(error: Error): { error: string; code: string } {
  if (error instanceof TokenExpiredError) {
    return { error: error.message, code: AUTH_ERROR_CODES.TOKEN_EXPIRED };
  }
  if (error instanceof InvalidTokenError) {
    return { error: error.message, code: AUTH_ERROR_CODES.INVALID_TOKEN };
  }
  if (error instanceof ForbiddenError) {
    return { error: error.message, code: AUTH_ERROR_CODES.FORBIDDEN };
  }
  return { error: "Authentication failed", code: AUTH_ERROR_CODES.SERVER_ERROR };
}
