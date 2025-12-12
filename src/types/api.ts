// API Response Interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Dashboard Interfaces
export interface DashboardMetrics {
  vehiclesNeedingCharge: number;
  vehiclesChargingNow: number;
  vehiclesToday: number;
  tripsAtRisk: number;
  forecastEnergyCost: number;
  energyCostTrend: number;
  forecastDowntimeCost: number;
}

// Depot Interfaces
export interface Depot {
  id: string;
  name: string;
  connectors: number;
  availableConnectors: number;
  inUseConnectors: number;
  faultyConnectors: number;
  loadUtilization: number;
  address: string;
  city: string;
}

// Charging Session Interfaces
export interface ChargingSession {
  id: string;
  vehicleId: string;
  vehicleVrn: string;
  depotId: string;
  depotName: string;
  connector: string;
  startTime: string;
  endTime?: string;
  duration: string;
  startSoc: number;
  currentSoc: number;
  targetSoc: number;
  power: string;
  energyDelivered: number;
  cost: number;
  status: 'active' | 'completed' | 'interrupted' | 'scheduled';
}

// Analytics Interfaces
export interface CostTrendData {
  date: string;
  energyCost: number;
  downtimeCost: number;
  totalCost: number;
}

export interface DowntimeData {
  date: string;
  travelTime: number;
  waitingTime: number;
  chargingTime: number;
}

export interface AnalyticsData {
  costTrends: CostTrendData[];
  downtimeAnalysis: DowntimeData[];
  totalEnergyCost: number;
  totalDowntimeCost: number;
  avgCostPerVehicle: number;
}

// Settings Interfaces
export interface ClientSettings {
  clientName: string;
  logoUrl?: string;
  defaultRole: 'admin' | 'manager' | 'viewer';
  currency: string;
  timezone: string;
}
