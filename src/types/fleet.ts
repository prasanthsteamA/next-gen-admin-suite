export interface Vehicle {
  id: string;
  vrn: string;
  name: string;
  make: string;
  model: string;
  soc: number;
  target: number;
  depot: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  nextDispatch?: string;
  avgCostPerDay: number;
  acMaxPower?: number;
  dcMaxPower?: number;
  v2gEnabled?: boolean;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  color?: 'orange' | 'blue' | 'default';
}

export interface ChargingHub {
  id: string;
  name: string;
  distance: string;
  power: string;
  pricePerKwh: string;
  totalCost: number;
  downtimeCost: number;
  chargingCost: number;
  targetSoc: string;
  energy: string;
  available: boolean;
}

export interface ScheduleSession {
  id: string;
  vehicleId: string;
  location: string;
  connector: string;
  startTime: string;
  duration: string;
  startSoc: number;
  endSoc: number;
  power: string;
  type: 'dc' | 'ac';
  status: 'scheduled' | 'in-progress' | 'completed' | 'conflict';
}
