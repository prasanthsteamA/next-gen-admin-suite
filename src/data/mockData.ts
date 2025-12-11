import { Vehicle, Alert, ChargingHub, ScheduleSession } from "@/types/fleet";

export const vehicles: Vehicle[] = [
  { id: "1", vrn: "VEH-001", name: "Fleet Tata Ace EV", make: "Tata Motors", model: "Ace EV", soc: 85, target: 85, depot: "Coimbatore Hub", location: "Saibaba Colony", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3513 },
  { id: "2", vrn: "VEH-002", name: "Fleet Tata Ultra T.7", make: "Tata Motors", model: "Ultra T.7 Electric", soc: 80, target: 90, depot: "Airport Logistics Depot", location: "Town Hall", priority: "medium", nextDispatch: "high priority", avgCostPerDay: 3514 },
  { id: "3", vrn: "VEH-003", name: "Fleet Mahindra XUV400", make: "Mahindra", model: "XUV400", soc: 88, target: 80, depot: "North Ring Road Hub", location: "Race Course", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3515 },
  { id: "4", vrn: "VEH-004", name: "Fleet Mahindra eVerito", make: "Mahindra", model: "eVerito Fleet", soc: 82, target: 90, depot: "Coimbatore Hub", location: "Ganapathy", priority: "medium", nextDispatch: "high priority", avgCostPerDay: 3516 },
  { id: "5", vrn: "VEH-005", name: "Fleet XPRES-T EV", make: "Tata Motors", model: "XPRES-T EV", soc: 46, target: 85, depot: "City Center Overnight Yard", location: "Singanallur", priority: "low", nextDispatch: "high priority", avgCostPerDay: 3517 },
  { id: "6", vrn: "VEH-006", name: "Fleet BYD e6", make: "BYD", model: "e6 MPV", soc: 67, target: 90, depot: "Industrial Zone Hub", location: "Ukkadam", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3518 },
  { id: "7", vrn: "VEH-007", name: "Fleet Eicher Pro", make: "Eicher", model: "Pro 2055 EV", soc: 36, target: 88, depot: "Airport Logistics Depot", location: "Saravanampatti", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3519 },
  { id: "8", vrn: "VEH-008", name: "Fleet Tata Ace EV 2", make: "Tata Motors", model: "Ace EV", soc: 42, target: 85, depot: "Coimbatore Hub", location: "Gandhipuram", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3520 },
  { id: "9", vrn: "VEH-009", name: "Fleet Ultra T.7 2", make: "Tata Motors", model: "Ultra T.7 Electric", soc: 53, target: 90, depot: "Airport Logistics Depot", location: "RS Puram", priority: "medium", nextDispatch: "high priority", avgCostPerDay: 3521 },
  { id: "10", vrn: "VEH-010", name: "Fleet Mahindra XUV400 2", make: "Mahindra", model: "XUV400", soc: 34, target: 80, depot: "North Ring Road Hub", location: "Saibaba Colony", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3513 },
  { id: "11", vrn: "VEH-011", name: "Fleet Mahindra eVerito 2", make: "Mahindra", model: "eVerito Fleet", soc: 65, target: 90, depot: "Coimbatore Hub", location: "Town Hall", priority: "medium", nextDispatch: "high priority", avgCostPerDay: 3514 },
  { id: "12", vrn: "VEH-012", name: "Fleet XPRES-T EV 2", make: "Tata Motors", model: "XPRES-T EV", soc: 53, target: 85, depot: "City Center Overnight Yard", location: "Race Course", priority: "low", nextDispatch: "high priority", avgCostPerDay: 3515 },
];

export const vehiclesNeedingCharge: Vehicle[] = [
  { id: "v1", vrn: "VEH-052", name: "Fleet Mahindra XUV400", make: "Mahindra", model: "XUV400", soc: 18, target: 80, depot: "North Ring Road Hub", location: "Saravanampatti", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3500 },
  { id: "v2", vrn: "VEH-051", name: "Fleet Tata Ultra T.7", make: "Tata Motors", model: "Ultra T.7 Electric", soc: 22, target: 90, depot: "Airport Logistics Depot", location: "Ukkadam", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3500 },
  { id: "v3", vrn: "VEH-053", name: "Fleet Mahindra eVerito", make: "Mahindra", model: "eVerito Fleet", soc: 25, target: 90, depot: "Coimbatore Hub", location: "Gandhipuram", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3500 },
  { id: "v4", vrn: "VEH-024", name: "Fleet Mahindra XUV400", make: "Mahindra", model: "XUV400", soc: 28, target: 80, depot: "North Ring Road Hub", location: "Ukkadam", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3500 },
  { id: "v5", vrn: "VEH-045", name: "Fleet Mahindra XUV400", make: "Mahindra", model: "XUV400", soc: 29, target: 80, depot: "North Ring Road Hub", location: "RS Puram", priority: "high", nextDispatch: "high priority", avgCostPerDay: 3500 },
];

export const alerts: Alert[] = [
  { id: "a1", type: "critical", message: "Vehicle Car 492 SOC critically low (25%) - may miss next dispatch", time: "5m ago" },
  { id: "a2", type: "warning", message: "Connector 1: charging slower than expected", time: "15m ago" },
  { id: "a3", type: "critical", message: "Truck 234 extremely low SOC (18%) - urgent charging required", time: "25m ago" },
  { id: "a4", type: "warning", message: "Depot Coimbatore Hub approaching power limit (74%)", time: "35m ago" },
  { id: "a5", type: "info", message: "Vehicle Bus 435 finished charging - ready for dispatch", time: "45m ago" },
  { id: "a6", type: "info", message: "Charging plan updated for today", time: "1h ago" },
  { id: "a7", type: "warning", message: "Public charger queue increasing at Station A", time: "1h ago" },
];

export const chargingHubs: ChargingHub[] = [
  { id: "h1", name: "Airport Logistics Depot Charging Hub", distance: "4.41 km away", power: "22kW", pricePerKwh: "₹12.00/kWh", totalCost: 17.08, downtimeCost: 17.08, chargingCost: 0, targetSoc: "85.0%", energy: "0.00 kWh", available: true },
  { id: "h2", name: "Airport Logistics Depot Charging Hub", distance: "4.41 km away", power: "75kW", pricePerKwh: "₹12.00/kWh", totalCost: 17.08, downtimeCost: 17.08, chargingCost: 0, targetSoc: "85.0%", energy: "0.00 kWh", available: true },
  { id: "h3", name: "Airport Logistics Depot Charging Hub", distance: "4.41 km away", power: "22kW", pricePerKwh: "₹12.00/kWh", totalCost: 17.08, downtimeCost: 17.08, chargingCost: 0, targetSoc: "85.0%", energy: "0.00 kWh", available: true },
  { id: "h4", name: "Airport Logistics Depot Charging Hub", distance: "4.41 km away", power: "75kW", pricePerKwh: "₹12.00/kWh", totalCost: 17.08, downtimeCost: 17.08, chargingCost: 0, targetSoc: "85.0%", energy: "0.00 kWh", available: true },
];

export const scheduleSessions: ScheduleSession[] = [
  { id: "s1", vehicleId: "4", location: "Coimbatore Hub", connector: "Connector 6", startTime: "15:00", duration: "1h 30m", startSoc: 67, endSoc: 90, power: "60 kW", type: "dc", status: "scheduled" },
  { id: "s2", vehicleId: "5", location: "Coimbatore Hub", connector: "Connector 3", startTime: "14:00", duration: "45m", startSoc: 46, endSoc: 65, power: "22 kW", type: "ac", status: "scheduled" },
  { id: "s3", vehicleId: "6", location: "Industrial Zone Hub", connector: "Connector 2", startTime: "16:00", duration: "2h", startSoc: 67, endSoc: 90, power: "60 kW", type: "dc", status: "scheduled" },
  { id: "s4", vehicleId: "7", location: "Airport Logistics Depot", connector: "Connector 7", startTime: "17:00", duration: "2h 30m", startSoc: 36, endSoc: 88, power: "75 kW", type: "dc", status: "scheduled" },
  { id: "s5", vehicleId: "1", location: "North Ring Road Hub", connector: "Connector 1", startTime: "18:00", duration: "1h", startSoc: 85, endSoc: 100, power: "22 kW", type: "ac", status: "scheduled" },
  { id: "s6", vehicleId: "8", location: "Coimbatore Hub", connector: "Connector 4", startTime: "19:00", duration: "2h", startSoc: 42, endSoc: 85, power: "60 kW", type: "dc", status: "scheduled" },
  { id: "s7", vehicleId: "10", location: "City Center Yard", connector: "Connector 2", startTime: "20:00", duration: "3h", startSoc: 34, endSoc: 80, power: "22 kW", type: "ac", status: "scheduled" },
];
