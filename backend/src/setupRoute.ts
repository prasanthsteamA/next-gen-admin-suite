import { Express } from 'express';

// Feature Routes
import authRouter from './auth/router';
import vehiclesRouter from './vehicles/router';
import alertsRouter from './alerts/router';
import chargingPointsRouter from './chargingPoints/router';
import chargingSessionsRouter from './chargingSessions/router';
import chargingStationsRouter from './chargingStations/router';
import dashboardRouter from './dashboard/router';
import permissionsRouter from './permissions/router';
import usersRouter from './users/router';
import depotsRouter from './depots/router';
import analyticsRouter from './analytics/router';
import settingsRouter from './settingsModule/router';
import scheduleRouter from './schedule/router';

// API Version prefix
const API_PREFIX = '/api/v1';

/**
 * Setup all application routes
 * @param app Express application instance
 */
export function setupRoutes(app: Express): void {
  // Authentication & Authorization
  app.use(`${API_PREFIX}/auth`, authRouter);
  
  // User Management
  app.use(`${API_PREFIX}/users`, usersRouter);
  
  // Vehicle Management
  app.use(`${API_PREFIX}/vehicles`, vehiclesRouter);
  
  // Depot Management
  app.use(`${API_PREFIX}/depots`, depotsRouter);
  
  // Alert System
  app.use(`${API_PREFIX}/alerts`, alertsRouter);
  
  // Charging Infrastructure
  app.use(`${API_PREFIX}/charging-points`, chargingPointsRouter);
  app.use(`${API_PREFIX}/charging-stations`, chargingStationsRouter);
  app.use(`${API_PREFIX}/charging-sessions`, chargingSessionsRouter);
  
  // Dashboard & Analytics
  app.use(`${API_PREFIX}/dashboard`, dashboardRouter);
  app.use(`${API_PREFIX}/analytics`, analyticsRouter);
  
  // Schedule Management
  app.use(`${API_PREFIX}/schedule`, scheduleRouter);
  
  // Permissions
  app.use(`${API_PREFIX}/permissions`, permissionsRouter);
  
  // Settings
  app.use(`${API_PREFIX}/settings`, settingsRouter);

  console.log('✅ All routes registered successfully');
}
