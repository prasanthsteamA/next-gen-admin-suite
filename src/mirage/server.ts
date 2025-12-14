import { createServer, Model, Response } from 'miragejs';
import { vehicles, vehiclesNeedingCharge, alerts, chargingHubs, scheduleSessions } from '@/data/mockData';
import { Depot, ChargingSession, DashboardMetrics, AnalyticsData, ClientSettings } from '@/types/api';

// Extended mock data
const depots: Depot[] = [
  { id: 'd1', name: 'Coimbatore Hub', connectors: 12, availableConnectors: 5, inUseConnectors: 6, faultyConnectors: 1, loadUtilization: 74, address: '123 Main St', city: 'Coimbatore' },
  { id: 'd2', name: 'Airport Logistics Depot', connectors: 8, availableConnectors: 3, inUseConnectors: 5, faultyConnectors: 0, loadUtilization: 62, address: '456 Airport Rd', city: 'Coimbatore' },
  { id: 'd3', name: 'Industrial Zone Hub', connectors: 16, availableConnectors: 8, inUseConnectors: 7, faultyConnectors: 1, loadUtilization: 55, address: '789 Industrial Ave', city: 'Coimbatore' },
  { id: 'd4', name: 'City Center Overnight Yard', connectors: 10, availableConnectors: 4, inUseConnectors: 6, faultyConnectors: 0, loadUtilization: 60, address: '321 City Center', city: 'Coimbatore' },
  { id: 'd5', name: 'North Ring Road Hub', connectors: 14, availableConnectors: 6, inUseConnectors: 7, faultyConnectors: 1, loadUtilization: 68, address: '654 Ring Rd', city: 'Coimbatore' },
];

const chargingSessions: ChargingSession[] = [
  { id: 'cs1', vehicleId: '1', vehicleVrn: 'VEH-001', depotId: 'd1', depotName: 'Coimbatore Hub', connector: 'Connector 3', startTime: '2025-12-11T10:00:00', duration: '2h 15m', startSoc: 25, currentSoc: 67, targetSoc: 90, power: '60 kW', energyDelivered: 45.5, cost: 546, status: 'active' },
  { id: 'cs2', vehicleId: '2', vehicleVrn: 'VEH-002', depotId: 'd2', depotName: 'Airport Logistics Depot', connector: 'Connector 1', startTime: '2025-12-11T09:30:00', duration: '1h 45m', startSoc: 30, currentSoc: 58, targetSoc: 85, power: '75 kW', energyDelivered: 38.2, cost: 458, status: 'active' },
  { id: 'cs3', vehicleId: '5', vehicleVrn: 'VEH-005', depotId: 'd1', depotName: 'Coimbatore Hub', connector: 'Connector 7', startTime: '2025-12-11T08:00:00', endTime: '2025-12-11T08:45:00', duration: '45m', startSoc: 46, currentSoc: 46, targetSoc: 65, power: '22 kW', energyDelivered: 12.1, cost: 145, status: 'interrupted' },
  { id: 'cs4', vehicleId: '3', vehicleVrn: 'VEH-003', depotId: 'd3', depotName: 'Industrial Zone Hub', connector: 'Connector 2', startTime: '2025-12-11T06:00:00', endTime: '2025-12-11T09:00:00', duration: '3h', startSoc: 20, currentSoc: 88, targetSoc: 88, power: '60 kW', energyDelivered: 72.5, cost: 870, status: 'completed' },
  { id: 'cs5', vehicleId: '7', vehicleVrn: 'VEH-007', depotId: 'd2', depotName: 'Airport Logistics Depot', connector: 'Connector 4', startTime: '2025-12-11T05:00:00', endTime: '2025-12-11T08:30:00', duration: '3h 30m', startSoc: 15, currentSoc: 90, targetSoc: 90, power: '75 kW', energyDelivered: 85.2, cost: 1022, status: 'completed' },
];

const dashboardMetrics: DashboardMetrics = {
  vehiclesNeedingCharge: 50,
  vehiclesChargingNow: 5,
  vehiclesToday: 50,
  tripsAtRisk: 5,
  forecastEnergyCost: 12350,
  energyCostTrend: 8.1,
  forecastDowntimeCost: 8900,
};

const analyticsData: AnalyticsData = {
  costTrends: [
    { date: '2025-12-05', energyCost: 11200, downtimeCost: 8500, totalCost: 19700 },
    { date: '2025-12-06', energyCost: 12100, downtimeCost: 9200, totalCost: 21300 },
    { date: '2025-12-07', energyCost: 10800, downtimeCost: 7800, totalCost: 18600 },
    { date: '2025-12-08', energyCost: 11500, downtimeCost: 8100, totalCost: 19600 },
    { date: '2025-12-09', energyCost: 12800, downtimeCost: 9500, totalCost: 22300 },
    { date: '2025-12-10', energyCost: 11900, downtimeCost: 8700, totalCost: 20600 },
    { date: '2025-12-11', energyCost: 12350, downtimeCost: 8900, totalCost: 21250 },
  ],
  downtimeAnalysis: [
    { date: '2025-12-05', travelTime: 120, waitingTime: 45, chargingTime: 180 },
    { date: '2025-12-06', travelTime: 135, waitingTime: 60, chargingTime: 195 },
    { date: '2025-12-07', travelTime: 110, waitingTime: 30, chargingTime: 165 },
    { date: '2025-12-08', travelTime: 125, waitingTime: 50, chargingTime: 175 },
    { date: '2025-12-09', travelTime: 140, waitingTime: 55, chargingTime: 200 },
    { date: '2025-12-10', travelTime: 130, waitingTime: 40, chargingTime: 185 },
    { date: '2025-12-11', travelTime: 128, waitingTime: 48, chargingTime: 182 },
  ],
  totalEnergyCost: 82650,
  totalDowntimeCost: 60700,
  avgCostPerVehicle: 2390,
};

const clientSettings: ClientSettings = {
  clientName: 'IRIS Fleet',
  logoUrl: undefined,
  defaultRole: 'manager',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
};

// Mock users for authentication
const mockUsers = [
  { id: 'u1', username: 'admin', password: 'admin123', email: 'admin@irisfleet.com', name: 'Admin User', role: 'admin' },
  { id: 'u2', username: 'manager', password: 'manager123', email: 'manager@irisfleet.com', name: 'Fleet Manager', role: 'manager' },
  { id: 'u3', username: 'operator', password: 'operator123', email: 'operator@irisfleet.com', name: 'Operator', role: 'operator' },
];

export function makeServer() {
  return createServer({
    models: {
      vehicle: Model,
      depot: Model,
      alert: Model,
      chargingSession: Model,
      scheduleSession: Model,
    },

    seeds(server) {
      vehicles.forEach(v => server.create('vehicle', v as any));
      depots.forEach(d => server.create('depot', d as any));
      alerts.forEach(a => server.create('alert', a as any));
      chargingSessions.forEach(cs => server.create('chargingSession', cs as any));
      scheduleSessions.forEach(ss => server.create('scheduleSession', ss as any));
    },

    routes() {
      this.namespace = 'api';
      this.timing = 200;

      // Dashboard
      this.get('/dashboard/metrics', () => {
        return { data: dashboardMetrics, success: true };
      });

      // Vehicles
      this.get('/vehicles', (schema, request) => {
        const pageParam = request.queryParams.page;
        const pageSizeParam = request.queryParams.pageSize;
        const page = parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam || '1');
        const pageSize = parseInt(Array.isArray(pageSizeParam) ? pageSizeParam[0] : pageSizeParam || '20');
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedVehicles = vehicles.slice(start, end);
        
        return {
          data: paginatedVehicles,
          total: vehicles.length,
          page,
          pageSize,
          totalPages: Math.ceil(vehicles.length / pageSize),
        };
      });

      this.get('/vehicles/needing-charge', () => {
        return { data: vehiclesNeedingCharge, success: true };
      });

      this.get('/vehicles/:id', (schema, request) => {
        const vehicle = vehicles.find(v => v.id === request.params.id);
        if (vehicle) {
          return { data: vehicle, success: true };
        }
        return new Response(404, {}, { success: false, message: 'Vehicle not found' });
      });

      // Depots
      this.get('/depots', () => {
        return { data: depots, success: true };
      });

      this.get('/depots/:id', (schema, request) => {
        const depot = depots.find(d => d.id === request.params.id);
        if (depot) {
          return { data: depot, success: true };
        }
        return new Response(404, {}, { success: false, message: 'Depot not found' });
      });

      // Alerts
      this.get('/alerts', () => {
        return { data: alerts, success: true };
      });

      // Charging Hubs
      this.get('/charging-hubs', () => {
        return { data: chargingHubs, success: true };
      });

      // Charging Sessions
      this.get('/charging-sessions', (schema, request) => {
        const status = request.queryParams.status;
        let filtered = chargingSessions;
        if (status) {
          filtered = chargingSessions.filter(s => s.status === status);
        }
        return { data: filtered, success: true };
      });

      // Schedule Sessions
      this.get('/schedule-sessions', (schema, request) => {
        const date = request.queryParams.date;
        return { data: scheduleSessions, success: true };
      });

      this.post('/schedule-sessions', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newSession = { id: `s${Date.now()}`, ...attrs };
        return { data: newSession, success: true };
      });

      // Analytics
      this.get('/analytics', () => {
        return { data: analyticsData, success: true };
      });

      // Settings
      this.get('/settings', () => {
        return { data: clientSettings, success: true };
      });

      this.put('/settings', (schema, request) => {
        const updates = JSON.parse(request.requestBody);
        Object.assign(clientSettings, updates);
        return { data: clientSettings, success: true };
      });

      // Authentication
      this.post('/auth/login', (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          return { success: true, user: userWithoutPassword };
        }
        
        return new Response(401, {}, { success: false, message: 'Invalid username or password' });
      });

      this.post('/auth/forgot-password', (schema, request) => {
        const { email } = JSON.parse(request.requestBody);
        const user = mockUsers.find(u => u.email === email);
        
        // Always return success for security (don't reveal if email exists)
        return { success: true, message: 'If an account exists with this email, a reset link has been sent.' };
      });

      this.post('/auth/logout', () => {
        return { success: true };
      });
    },
  });
}
