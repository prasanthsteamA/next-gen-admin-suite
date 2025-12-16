import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { settings } from './settings';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IRIS Fleet Management API',
      version: settings.version,
      description: `
# IRIS Fleet Management Backend API

This API provides comprehensive fleet management capabilities for electric vehicle operations.

## Features
- **Authentication**: JWT-based authentication with role-based access control
- **Vehicle Management**: CRUD operations for fleet vehicles with SOC tracking
- **Depot Management**: Manage charging depots and connectors
- **Charging Sessions**: Track and manage vehicle charging sessions
- **Alerts**: Real-time alert system for fleet events
- **Analytics**: Cost analysis and performance metrics
- **Scheduling**: Charging schedule management

## Authentication
Most endpoints require a valid JWT token. Include the token in the Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`
      `,
      contact: {
        name: 'IRIS Fleet Support',
        email: 'support@irisfleet.com',
      },
      license: {
        name: 'Proprietary',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'https://api-dev.irisfleet.com',
        description: 'Development API',
      },
      {
        url: 'https://api-staging.irisfleet.com',
        description: 'Staging API',
      },
      {
        url: 'https://api.irisfleet.com',
        description: 'Production API',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'array', items: {} },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'integer' },
                pageSize: { type: 'integer' },
                total: { type: 'integer' },
                totalPages: { type: 'integer' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'object' } },
          },
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            vrn: { type: 'string', description: 'Vehicle Registration Number' },
            name: { type: 'string' },
            make: { type: 'string' },
            model: { type: 'string' },
            soc: { type: 'number', minimum: 0, maximum: 100 },
            target: { type: 'number', minimum: 0, maximum: 100 },
            depot_id: { type: 'string', format: 'uuid' },
            location: { type: 'string' },
            priority: { type: 'string', enum: ['high', 'medium', 'low'] },
            next_dispatch: { type: 'string', format: 'date-time' },
            avg_cost_per_day: { type: 'number' },
            ac_max_power: { type: 'number' },
            dc_max_power: { type: 'number' },
            v2g_enabled: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Depot: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            connectors: { type: 'integer' },
            available_connectors: { type: 'integer' },
            in_use_connectors: { type: 'integer' },
            faulty_connectors: { type: 'integer' },
            load_utilization: { type: 'number' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
          },
        },
        Alert: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            type: { type: 'string', enum: ['critical', 'warning', 'info'] },
            message: { type: 'string' },
            vehicle_id: { type: 'string', format: 'uuid' },
            depot_id: { type: 'string', format: 'uuid' },
            acknowledged: { type: 'boolean' },
            acknowledged_by: { type: 'string', format: 'uuid' },
            acknowledged_at: { type: 'string', format: 'date-time' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        ChargingSession: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            vehicle_id: { type: 'string', format: 'uuid' },
            depot_id: { type: 'string', format: 'uuid' },
            connector: { type: 'string' },
            start_time: { type: 'string', format: 'date-time' },
            end_time: { type: 'string', format: 'date-time' },
            duration: { type: 'string' },
            start_soc: { type: 'number' },
            current_soc: { type: 'number' },
            target_soc: { type: 'number' },
            power: { type: 'string' },
            energy_delivered: { type: 'number' },
            cost: { type: 'number' },
            status: { type: 'string', enum: ['active', 'completed', 'interrupted', 'scheduled'] },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Users', description: 'User management' },
      { name: 'Vehicles', description: 'Vehicle management' },
      { name: 'Depots', description: 'Depot management' },
      { name: 'Alerts', description: 'Alert system' },
      { name: 'Charging Points', description: 'Charging point management' },
      { name: 'Charging Stations', description: 'Charging station management' },
      { name: 'Charging Sessions', description: 'Charging session tracking' },
      { name: 'Dashboard', description: 'Dashboard metrics' },
      { name: 'Analytics', description: 'Analytics and reports' },
      { name: 'Schedule', description: 'Schedule management' },
      { name: 'Permissions', description: 'Permission management' },
      { name: 'Settings', description: 'Application settings' },
    ],
  },
  apis: ['./src/**/router.ts', './src/**/controller.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function swaggerSetup(app: Express): void {
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'IRIS Fleet API Documentation',
  }));

  // Raw Swagger JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📚 Swagger documentation available at /api-docs');
}

export default swaggerSpec;
