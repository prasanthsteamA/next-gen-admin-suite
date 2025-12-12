import { MIRAGE_ENABLED, API_BASE_URL } from '@/config/mirage';
import { Vehicle, Alert, ChargingHub, ScheduleSession } from '@/types/fleet';
import { 
  ApiResponse, 
  PaginatedResponse, 
  DashboardMetrics, 
  Depot, 
  ChargingSession, 
  AnalyticsData, 
  ClientSettings 
} from '@/types/api';

const getBaseUrl = () => MIRAGE_ENABLED ? '/api' : API_BASE_URL;

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

// Dashboard API
export const dashboardApi = {
  getMetrics: () => fetchApi<ApiResponse<DashboardMetrics>>('/dashboard/metrics'),
};

// Vehicles API
export const vehiclesApi = {
  getAll: (page = 1, pageSize = 20) => 
    fetchApi<PaginatedResponse<Vehicle>>(`/vehicles?page=${page}&pageSize=${pageSize}`),
  
  getNeedingCharge: () => 
    fetchApi<ApiResponse<Vehicle[]>>('/vehicles/needing-charge'),
  
  getById: (id: string) => 
    fetchApi<ApiResponse<Vehicle>>(`/vehicles/${id}`),
};

// Depots API
export const depotsApi = {
  getAll: () => fetchApi<ApiResponse<Depot[]>>('/depots'),
  getById: (id: string) => fetchApi<ApiResponse<Depot>>(`/depots/${id}`),
};

// Alerts API
export const alertsApi = {
  getAll: () => fetchApi<ApiResponse<Alert[]>>('/alerts'),
};

// Charging Hubs API
export const chargingHubsApi = {
  getAll: () => fetchApi<ApiResponse<ChargingHub[]>>('/charging-hubs'),
};

// Charging Sessions API
export const chargingSessionsApi = {
  getAll: (status?: string) => 
    fetchApi<ApiResponse<ChargingSession[]>>(`/charging-sessions${status ? `?status=${status}` : ''}`),
};

// Schedule Sessions API
export const scheduleSessionsApi = {
  getAll: (date?: string) => 
    fetchApi<ApiResponse<ScheduleSession[]>>(`/schedule-sessions${date ? `?date=${date}` : ''}`),
  
  create: (session: Partial<ScheduleSession>) => 
    fetchApi<ApiResponse<ScheduleSession>>('/schedule-sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    }),
};

// Analytics API
export const analyticsApi = {
  getData: () => fetchApi<ApiResponse<AnalyticsData>>('/analytics'),
};

// Settings API
export const settingsApi = {
  get: () => fetchApi<ApiResponse<ClientSettings>>('/settings'),
  update: (settings: Partial<ClientSettings>) => 
    fetchApi<ApiResponse<ClientSettings>>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
};
