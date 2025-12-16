import { queryOne, queryAll, query } from '../lib/connection_db';
import { generateUUID, getCurrentTimestamp } from '../lib/common_modules';
import { UserRole } from '../lib/constants';

export interface User {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const sql = `
    SELECT id, email, password, first_name, last_name, is_active, created_at, updated_at
    FROM users
    WHERE email = $1 AND is_active = true
  `;
  return queryOne<User>(sql, [email.toLowerCase()]);
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  const sql = `
    SELECT id, email, password, first_name, last_name, is_active, created_at, updated_at
    FROM users
    WHERE id = $1 AND is_active = true
  `;
  return queryOne<User>(sql, [id]);
}

/**
 * Create new user
 */
export async function createUser(data: CreateUserData): Promise<User> {
  const id = generateUUID();
  const now = getCurrentTimestamp();
  
  const sql = `
    INSERT INTO users (id, email, password, first_name, last_name, is_active, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, true, $6, $6)
    RETURNING id, email, password, first_name, last_name, is_active, created_at, updated_at
  `;
  
  const result = await queryOne<User>(sql, [
    id,
    data.email.toLowerCase(),
    data.password,
    data.firstName,
    data.lastName,
    now,
  ]);
  
  if (!result) {
    throw new Error('Failed to create user');
  }
  
  // Assign default role
  await assignUserRole(id, 'viewer' as UserRole);
  
  return result;
}

/**
 * Update user password
 */
export async function updatePassword(userId: string, hashedPassword: string): Promise<void> {
  const sql = `
    UPDATE users
    SET password = $1, updated_at = $2
    WHERE id = $3
  `;
  await query(sql, [hashedPassword, getCurrentTimestamp(), userId]);
}

/**
 * Get user roles
 */
export async function getUserRoles(userId: string): Promise<UserRole[]> {
  const sql = `
    SELECT role
    FROM user_roles
    WHERE user_id = $1
  `;
  const results = await queryAll<{ role: UserRole }>(sql, [userId]);
  return results.map((r) => r.role);
}

/**
 * Assign role to user
 */
export async function assignUserRole(userId: string, role: UserRole): Promise<void> {
  const sql = `
    INSERT INTO user_roles (id, user_id, role)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, role) DO NOTHING
  `;
  await query(sql, [generateUUID(), userId, role]);
}

/**
 * Remove role from user
 */
export async function removeUserRole(userId: string, role: UserRole): Promise<void> {
  const sql = `
    DELETE FROM user_roles
    WHERE user_id = $1 AND role = $2
  `;
  await query(sql, [userId, role]);
}

/**
 * Check if user has role
 */
export async function hasRole(userId: string, role: UserRole): Promise<boolean> {
  const sql = `
    SELECT EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = $1 AND role = $2
    ) as has_role
  `;
  const result = await queryOne<{ has_role: boolean }>(sql, [userId, role]);
  return result?.has_role || false;
}

/**
 * Store password reset token
 */
export async function storeResetToken(userId: string, token: string, expiresAt: Date): Promise<void> {
  const sql = `
    INSERT INTO password_reset_tokens (id, user_id, token, expires_at, created_at)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id) DO UPDATE
    SET token = $3, expires_at = $4, created_at = $5
  `;
  await query(sql, [generateUUID(), userId, token, expiresAt.toISOString(), getCurrentTimestamp()]);
}

/**
 * Verify password reset token
 */
export async function verifyResetToken(token: string): Promise<string | null> {
  const sql = `
    SELECT user_id
    FROM password_reset_tokens
    WHERE token = $1 AND expires_at > NOW()
  `;
  const result = await queryOne<{ user_id: string }>(sql, [token]);
  return result?.user_id || null;
}

/**
 * Delete password reset token
 */
export async function deleteResetToken(userId: string): Promise<void> {
  const sql = `
    DELETE FROM password_reset_tokens
    WHERE user_id = $1
  `;
  await query(sql, [userId]);
}
