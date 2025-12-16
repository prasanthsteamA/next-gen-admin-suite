import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { settings } from '../settings';
import { sendUnauthorized, sendForbidden } from '../lib/common_modules';
import { getUserRoles } from './queries';
import { UserRole } from '../lib/constants';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: UserRole[];
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Verify JWT token middleware
 */
export async function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return sendUnauthorized(res, 'No authorization header provided');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return sendUnauthorized(res, 'Invalid authorization header format');
    }

    const token = parts[1];

    const decoded = jwt.verify(token, settings.jwt.secret) as JwtPayload;

    // Get user roles from database
    const roles = await getUserRoles(decoded.userId);

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      roles: roles,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return sendUnauthorized(res, 'Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return sendUnauthorized(res, 'Invalid token');
    }
    console.error('Auth middleware error:', error);
    return sendUnauthorized(res, 'Authentication failed');
  }
}

/**
 * Optional authentication - continues even without token
 */
export async function optionalAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        const token = parts[1];
        const decoded = jwt.verify(token, settings.jwt.secret) as JwtPayload;
        const roles = await getUserRoles(decoded.userId);

        req.user = {
          id: decoded.userId,
          email: decoded.email,
          roles: roles,
        };
      }
    }
  } catch (error) {
    // Ignore errors for optional auth
  }

  next();
}

/**
 * Role-based access control middleware
 */
export function requireRoles(...allowedRoles: UserRole[]) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void | Response => {
    if (!req.user) {
      return sendUnauthorized(res, 'Authentication required');
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return sendForbidden(
        res,
        `Access denied. Required roles: ${allowedRoles.join(', ')}`
      );
    }

    next();
  };
}

/**
 * Admin only middleware
 */
export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void | Response {
  return requireRoles('admin' as UserRole)(req, res, next);
}

/**
 * Generate JWT token
 */
export function generateToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    settings.jwt.secret,
    { expiresIn: settings.jwt.expiresIn }
  );
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { userId, type: 'refresh' },
    settings.jwt.secret,
    { expiresIn: settings.jwt.refreshExpiresIn }
  );
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, settings.jwt.secret) as { userId: string; type: string };
    if (decoded.type !== 'refresh') {
      return null;
    }
    return { userId: decoded.userId };
  } catch {
    return null;
  }
}

export default {
  verifyToken,
  optionalAuth,
  requireRoles,
  requireAdmin,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
};
