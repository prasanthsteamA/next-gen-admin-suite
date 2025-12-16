# IRIS Fleet Backend

TypeScript-based serverless AWS Lambda backend using Express.js for the IRIS Fleet Management System.

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main Express application
│   ├── setupRoute.ts         # Route configuration
│   ├── settings.ts           # Application settings
│   ├── settingsTypes.ts      # TypeScript types for settings
│   ├── swagger.ts            # API documentation
│   ├── lib/                  # Shared libraries
│   │   ├── common_modules.ts # Utility functions
│   │   ├── connection_db.ts  # Database connection
│   │   └── constants.ts      # Application constants
│   ├── auth/                 # Authentication module
│   ├── vehicles/             # Vehicle management
│   ├── depots/               # Depot management
│   ├── alerts/               # Alert system
│   ├── chargingPoints/       # Charging points
│   ├── chargingSessions/     # Charging sessions
│   ├── chargingStations/     # Charging stations
│   ├── dashboard/            # Dashboard metrics
│   ├── analytics/            # Analytics & reports
│   ├── schedule/             # Schedule management
│   ├── permissions/          # Permission management
│   ├── users/                # User management
│   └── settingsModule/       # App settings
├── package.json
├── tsconfig.json
└── serverless.yml
```

## Quick Start

```bash
cd backend
npm install
npm run dev
```

## API Documentation

Available at `http://localhost:3001/api-docs` when running locally.

## Deployment

```bash
npm run deploy:dev      # Deploy to dev
npm run deploy:staging  # Deploy to staging
npm run deploy:prod     # Deploy to production
```
