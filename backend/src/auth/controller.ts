import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { AuthenticatedRequest, generateToken, generateRefreshToken, verifyRefreshToken } from './middleware';
import { sendSuccess, sendError, sendUnauthorized, sendNotFound } from '../lib/common_modules';
import { createUser, findUserByEmail, findUserById, updatePassword, getUserRoles } from './queries';
import { ERROR_CODES, HTTP_STATUS } from '../lib/constants';
import { validationResult } from 'express-validator';

/**
 * User Signup
 */
export async function signup(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return sendError(res, 'Email already registered', HTTP_STATUS.CONFLICT);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Generate tokens
    const token = generateToken(user.id, user.email);
    const refreshTokenValue = generateRefreshToken(user.id);

    return sendSuccess(
      res,
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        token,
        refreshToken: refreshTokenValue,
      },
      'User registered successfully',
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    console.error('Signup error:', error);
    return sendError(res, 'Registration failed');
  }
}

/**
 * User Login
 */
export async function login(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { email, password } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return sendUnauthorized(res, 'Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return sendUnauthorized(res, 'Invalid credentials');
    }

    // Get user roles
    const roles = await getUserRoles(user.id);

    // Generate tokens
    const token = generateToken(user.id, user.email);
    const refreshTokenValue = generateRefreshToken(user.id);

    return sendSuccess(res, {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        roles,
      },
      token,
      refreshToken: refreshTokenValue,
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    return sendError(res, 'Login failed');
  }
}

/**
 * User Logout
 */
export async function logout(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    // In a production app, you would invalidate the token here
    // For JWT, this typically involves adding the token to a blacklist
    return sendSuccess(res, null, 'Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    return sendError(res, 'Logout failed');
  }
}

/**
 * Forgot Password
 */
export async function forgotPassword(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { email } = req.body;

    const user = await findUserByEmail(email);

    // Always return success to prevent email enumeration
    if (user) {
      // TODO: Generate reset token and send email
      console.log(`Password reset requested for: ${email}`);
    }

    return sendSuccess(
      res,
      null,
      'If an account with that email exists, a password reset link has been sent'
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return sendError(res, 'Failed to process forgot password request');
  }
}

/**
 * Reset Password
 */
export async function resetPassword(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { token, password } = req.body;

    // TODO: Verify reset token from database
    // For now, this is a placeholder
    const userId = ''; // Get from verified token

    if (!userId) {
      return sendError(res, 'Invalid or expired reset token', HTTP_STATUS.BAD_REQUEST);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    await updatePassword(userId, hashedPassword);

    return sendSuccess(res, null, 'Password reset successful');
  } catch (error) {
    console.error('Reset password error:', error);
    return sendError(res, 'Password reset failed');
  }
}

/**
 * Refresh Token
 */
export async function refreshToken(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const { refreshToken: refreshTokenValue } = req.body;

    if (!refreshTokenValue) {
      return sendError(res, 'Refresh token is required', HTTP_STATUS.BAD_REQUEST);
    }

    const decoded = verifyRefreshToken(refreshTokenValue);
    if (!decoded) {
      return sendUnauthorized(res, 'Invalid refresh token');
    }

    const user = await findUserById(decoded.userId);
    if (!user) {
      return sendUnauthorized(res, 'User not found');
    }

    // Generate new tokens
    const newToken = generateToken(user.id, user.email);
    const newRefreshToken = generateRefreshToken(user.id);

    return sendSuccess(res, {
      token: newToken,
      refreshToken: newRefreshToken,
    }, 'Token refreshed successfully');
  } catch (error) {
    console.error('Refresh token error:', error);
    return sendError(res, 'Token refresh failed');
  }
}

/**
 * Get Current User
 */
export async function getCurrentUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    if (!req.user) {
      return sendUnauthorized(res);
    }

    const user = await findUserById(req.user.id);
    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    return sendSuccess(res, {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      roles: req.user.roles,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return sendError(res, 'Failed to get user');
  }
}

/**
 * Change Password
 */
export async function changePassword(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    if (!req.user) {
      return sendUnauthorized(res);
    }

    const { currentPassword, newPassword } = req.body;

    const user = await findUserById(req.user.id);
    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return sendError(res, 'Current password is incorrect', HTTP_STATUS.BAD_REQUEST);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await updatePassword(user.id, hashedPassword);

    return sendSuccess(res, null, 'Password changed successfully');
  } catch (error) {
    console.error('Change password error:', error);
    return sendError(res, 'Password change failed');
  }
}
