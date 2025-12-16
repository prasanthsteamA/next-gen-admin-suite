export interface DatabaseSettings {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  maxConnections: number;
  idleTimeout: number;
  connectionTimeout: number;
}

export interface JwtSettings {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export interface CognitoSettings {
  userPoolId: string;
  clientId: string;
}

export interface S3Settings {
  bucket: string;
  region: string;
}

export interface SesSettings {
  fromEmail: string;
}

export interface AwsSettings {
  region: string;
  cognito: CognitoSettings;
  s3: S3Settings;
  ses: SesSettings;
}

export interface PaginationSettings {
  defaultPage: number;
  defaultPageSize: number;
  maxPageSize: number;
}

export interface RateLimitSettings {
  windowMs: number;
  max: number;
}

export interface LoggingSettings {
  level: string;
  format: string;
}

export interface AppSettings {
  // Application
  appName: string;
  version: string;
  environment: string;
  
  // Server
  port: number;
  
  // CORS
  corsOrigins: string[];
  
  // Database
  database: DatabaseSettings;
  
  // JWT
  jwt: JwtSettings;
  
  // AWS
  aws: AwsSettings;
  
  // Pagination
  pagination: PaginationSettings;
  
  // Rate limiting
  rateLimit: RateLimitSettings;
  
  // Logging
  logging: LoggingSettings;
}
