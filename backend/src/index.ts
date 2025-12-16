import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import expressWinston from 'express-winston';
import winston from 'winston';
import { setupRoutes } from './setupRoute';
import { swaggerSetup } from './swagger';
import { settings } from './settings';

// Initialize Express app
const app: Express = express();

// CORS Configuration
const corsOptions = {
  origin: settings.corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, meta }) => {
      return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
    })
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: (req: Request) => {
    // Ignore health check endpoints
    return req.url === '/health' || req.url === '/api/v1/health';
  }
}));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: settings.version,
    environment: settings.environment
  });
});

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: settings.version,
    environment: settings.environment
  });
});

// Swagger documentation
swaggerSetup(app);

// Setup all routes
setupRoutes(app);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error Handler:', err);
  
  res.status(500).json({
    success: false,
    message: settings.environment === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(settings.environment !== 'production' && { stack: err.stack })
  });
});

// Error logging
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.json()
  )
}));

// Local development server
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'lambda') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 IRIS Fleet Backend running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🔧 Environment: ${settings.environment}`);
  });
}

// Lambda handler
export const handler = serverless(app);

export default app;
