import { Vehicle, Alert, ChargingHub, ScheduleSession } from "@/types/fleet";

const makes = ['Tata Motors', 'Mahindra', 'BYD', 'Eicher'];
const models = ['Ace EV', 'Ultra T.7 Electric', 'XUV400', 'eVerito Fleet', 'XPRES-T EV', 'e6 MPV', 'Pro 2055 EV'];
const depots = ['Coimbatore Hub', 'Airport Logistics Depot', 'Industrial Zone Hub', 'City Center Overnight Yard', 'North Ring Road Hub'];
const locations = ['Saibaba Colony', 'Town Hall', 'Race Course', 'Ganapathy', 'Singanallur', 'Ukkadam', 'Saravanampatti', 'Gandhipuram', 'RS Puram', 'Peelamedu'];
const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];

// Generate 60 vehicles
export const vehicles: Vehicle[] = Array.from({ length: 60 }, (_, i) => {
  const id = String(i + 1);
  const vrn = `VEH-${String(i + 1).padStart(3, '0')}`;
  const makeIdx = i % makes.length;
  const modelIdx = i % models.length;
  const depotIdx = i % depots.length;
  const locationIdx = i % locations.length;
  const priorityIdx = i % priorities.length;
  const soc = Math.floor(Math.random() * 70) + 30;
  
  return {
    id,
    vrn,
    name: `Fleet ${makes[makeIdx]} ${models[modelIdx].split(' ')[0]}`,
    make: makes[makeIdx],
    model: models[modelIdx],
    soc,
    target: [80, 85, 88, 90][i % 4],
    depot: depots[depotIdx],
    location: locations[locationIdx],
    priority: priorities[priorityIdx],
    nextDispatch: 'high priority',
    avgCostPerDay: 3513 + (i % 10),
  };
});

export const vehiclesNeedingCharge: Vehicle[] = vehicles.filter(v => v.soc < 50).slice(0, 5);

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
