import { AppSettings } from './settingsTypes';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const settings: AppSettings = {
  // Application
  appName: 'IRIS Fleet Backend',
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  
  // CORS
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080'
  ],
  
  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'iris_fleet',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20', 10),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  
  // AWS
  aws: {
    region: process.env.AWS_REGION || 'ap-south-1',
    cognito: {
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID || '',
      clientId: process.env.AWS_COGNITO_CLIENT_ID || '',
    },
    s3: {
      bucket: process.env.S3_BUCKET || '',
      region: process.env.S3_REGION || process.env.AWS_REGION || 'ap-south-1',
    },
    ses: {
      fromEmail: process.env.SES_FROM_EMAIL || 'noreply@irisfleet.com',
    },
  },
  
  // Pagination defaults
  pagination: {
    defaultPage: 1,
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined',
  },
};

export default settings;
