import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
import _ from 'lodash';

/**
 * Standard API Response Helper
 */
export interface ApiResponseData<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Send success response
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Send paginated success response
 */
export function sendPaginatedSuccess<T>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message: string = 'Success'
): Response {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
}

/**
 * Send error response
 */
export function sendError(
  res: Response,
  message: string = 'An error occurred',
  statusCode: number = 500,
  errors?: any[]
): Response {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
}

/**
 * Send validation error response
 */
export function sendValidationError(
  res: Response,
  errors: any[],
  message: string = 'Validation failed'
): Response {
  return res.status(400).json({
    success: false,
    message,
    errors,
  });
}

/**
 * Send not found response
 */
export function sendNotFound(
  res: Response,
  message: string = 'Resource not found'
): Response {
  return res.status(404).json({
    success: false,
    message,
  });
}

/**
 * Send unauthorized response
 */
export function sendUnauthorized(
  res: Response,
  message: string = 'Unauthorized'
): Response {
  return res.status(401).json({
    success: false,
    message,
  });
}

/**
 * Send forbidden response
 */
export function sendForbidden(
  res: Response,
  message: string = 'Forbidden'
): Response {
  return res.status(403).json({
    success: false,
    message,
  });
}

/**
 * Generate UUID
 */
export function generateUUID(): string {
  return uuidv4();
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(timezone: string = 'UTC'): string {
  return moment().tz(timezone).format();
}

/**
 * Format date
 */
export function formatDate(
  date: Date | string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
  timezone: string = 'UTC'
): string {
  return moment(date).tz(timezone).format(format);
}

/**
 * Calculate pagination metadata
 */
export function calculatePagination(
  total: number,
  page: number,
  pageSize: number
): PaginationMeta {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

/**
 * Parse pagination params from request
 */
export function parsePaginationParams(
  query: any,
  defaults: { page: number; pageSize: number; maxPageSize: number }
): { page: number; pageSize: number; offset: number } {
  let page = parseInt(query.page, 10) || defaults.page;
  let pageSize = parseInt(query.pageSize || query.limit, 10) || defaults.pageSize;

  // Ensure valid values
  page = Math.max(1, page);
  pageSize = Math.min(Math.max(1, pageSize), defaults.maxPageSize);

  const offset = (page - 1) * pageSize;

  return { page, pageSize, offset };
}

/**
 * Sanitize object - remove undefined/null values
 */
export function sanitizeObject<T extends object>(obj: T): Partial<T> {
  return _.pickBy(obj, (value) => value !== undefined && value !== null) as Partial<T>;
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return _.cloneDeep(obj);
}

/**
 * Pick specific keys from object
 */
export function pickKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return _.pick(obj, keys) as Pick<T, K>;
}

/**
 * Omit specific keys from object
 */
export function omitKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return _.omit(obj, keys) as Omit<T, K>;
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry utility for async operations
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await sleep(delay * Math.pow(2, i)); // Exponential backoff
      }
    }
  }

  throw lastError;
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: any): boolean {
  return _.isEmpty(value);
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mask sensitive data
 */
export function maskSensitiveData(value: string, visibleChars: number = 4): string {
  if (!value || value.length <= visibleChars) {
    return '*'.repeat(value?.length || 0);
  }
  return '*'.repeat(value.length - visibleChars) + value.slice(-visibleChars);
}

export default {
  sendSuccess,
  sendPaginatedSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
  sendUnauthorized,
  sendForbidden,
  generateUUID,
  getCurrentTimestamp,
  formatDate,
  calculatePagination,
  parsePaginationParams,
  sanitizeObject,
  deepClone,
  pickKeys,
  omitKeys,
  sleep,
  retry,
  isEmpty,
  generateRandomString,
  maskSensitiveData,
};
