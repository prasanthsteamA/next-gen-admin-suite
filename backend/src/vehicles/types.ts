export interface Vehicle {
  id: string;
  vrn: string;
  name: string;
  make: string;
  model: string;
  soc: number;
  target: number;
  depot_id?: string;
  depot_name?: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  next_dispatch?: string;
  avg_cost_per_day: number;
  ac_max_power?: number;
  dc_max_power?: number;
  v2g_enabled: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleData {
  vrn: string;
  name: string;
  make: string;
  model: string;
  soc?: number;
  target?: number;
  depot_id?: string;
  location?: string;
  priority?: 'high' | 'medium' | 'low';
  next_dispatch?: string;
  avg_cost_per_day?: number;
  ac_max_power?: number;
  dc_max_power?: number;
  v2g_enabled?: boolean;
}

export interface UpdateVehicleData {
  vrn?: string;
  name?: string;
  make?: string;
  model?: string;
  soc?: number;
  target?: number;
  depot_id?: string;
  location?: string;
  priority?: 'high' | 'medium' | 'low';
  next_dispatch?: string;
  avg_cost_per_day?: number;
  ac_max_power?: number;
  dc_max_power?: number;
  v2g_enabled?: boolean;
}

export interface VehicleFilters {
  depot_id?: string;
  priority?: string;
  soc_below?: number;
  search?: string;
}
