/**
 * Application Constants
 */

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  VIEWER: 'viewer',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Alert Types
export const ALERT_TYPES = {
  CRITICAL: 'critical',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES];

// Vehicle Priority
export const VEHICLE_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export type VehiclePriority = typeof VEHICLE_PRIORITY[keyof typeof VEHICLE_PRIORITY];

// Charging Session Status
export const CHARGING_SESSION_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  INTERRUPTED: 'interrupted',
  SCHEDULED: 'scheduled',
} as const;

export type ChargingSessionStatus = typeof CHARGING_SESSION_STATUS[keyof typeof CHARGING_SESSION_STATUS];

// Schedule Session Status
export const SCHEDULE_SESSION_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CONFLICT: 'conflict',
  CANCELLED: 'cancelled',
} as const;

export type ScheduleSessionStatus = typeof SCHEDULE_SESSION_STATUS[keyof typeof SCHEDULE_SESSION_STATUS];

// Charging Types
export const CHARGING_TYPES = {
  AC: 'ac',
  DC: 'dc',
} as const;

export type ChargingType = typeof CHARGING_TYPES[keyof typeof CHARGING_TYPES];

// Connector Status
export const CONNECTOR_STATUS = {
  AVAILABLE: 'available',
  IN_USE: 'in_use',
  FAULTY: 'faulty',
  OFFLINE: 'offline',
  RESERVED: 'reserved',
} as const;

export type ConnectorStatus = typeof CONNECTOR_STATUS[keyof typeof CONNECTOR_STATUS];

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Codes
export const ERROR_CODES = {
  // Authentication
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_EMAIL_EXISTS: 'AUTH_EMAIL_EXISTS',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Resources
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  
  // Vehicles
  VEHICLE_NOT_FOUND: 'VEHICLE_NOT_FOUND',
  VEHICLE_ALREADY_CHARGING: 'VEHICLE_ALREADY_CHARGING',
  
  // Charging
  CHARGING_SESSION_NOT_FOUND: 'CHARGING_SESSION_NOT_FOUND',
  CHARGING_POINT_UNAVAILABLE: 'CHARGING_POINT_UNAVAILABLE',
  CHARGING_SCHEDULE_CONFLICT: 'CHARGING_SCHEDULE_CONFLICT',
  
  // Depots
  DEPOT_NOT_FOUND: 'DEPOT_NOT_FOUND',
  
  // Alerts
  ALERT_NOT_FOUND: 'ALERT_NOT_FOUND',
  
  // General
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// Permission Actions
export const PERMISSION_ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage',
} as const;

export type PermissionAction = typeof PERMISSION_ACTIONS[keyof typeof PERMISSION_ACTIONS];

// Permission Resources
export const PERMISSION_RESOURCES = {
  VEHICLES: 'vehicles',
  DEPOTS: 'depots',
  ALERTS: 'alerts',
  CHARGING_SESSIONS: 'charging_sessions',
  CHARGING_STATIONS: 'charging_stations',
  CHARGING_POINTS: 'charging_points',
  SCHEDULE: 'schedule',
  ANALYTICS: 'analytics',
  USERS: 'users',
  SETTINGS: 'settings',
  PERMISSIONS: 'permissions',
} as const;

export type PermissionResource = typeof PERMISSION_RESOURCES[keyof typeof PERMISSION_RESOURCES];

// Date/Time Formats
export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  DISPLAY_DATE: 'DD MMM YYYY',
  DISPLAY_DATETIME: 'DD MMM YYYY, HH:mm',
} as const;

// Default Pagination
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// SOC Thresholds
export const SOC_THRESHOLDS = {
  CRITICAL: 20,
  LOW: 40,
  MEDIUM: 60,
  HIGH: 80,
} as const;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
} as const;

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  VRN: /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/i, // Indian VRN format
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;

export default {
  USER_ROLES,
  ALERT_TYPES,
  VEHICLE_PRIORITY,
  CHARGING_SESSION_STATUS,
  SCHEDULE_SESSION_STATUS,
  CHARGING_TYPES,
  CONNECTOR_STATUS,
  HTTP_STATUS,
  ERROR_CODES,
  PERMISSION_ACTIONS,
  PERMISSION_RESOURCES,
  DATE_FORMATS,
  DEFAULT_PAGINATION,
  SOC_THRESHOLDS,
  CACHE_TTL,
  FILE_UPLOAD,
  REGEX_PATTERNS,
};
