import { Vehicle } from './types';
import { SOC_THRESHOLDS } from '../lib/constants';

/**
 * Calculate risk level based on SOC and next dispatch
 */
export function calculateRiskLevel(vehicle: Vehicle): 'high' | 'medium' | 'low' {
  const socGap = vehicle.target - vehicle.soc;
  
  if (vehicle.soc < SOC_THRESHOLDS.CRITICAL) {
    return 'high';
  }
  
  if (vehicle.soc < SOC_THRESHOLDS.LOW) {
    return 'medium';
  }
  
  if (vehicle.next_dispatch) {
    const dispatchTime = new Date(vehicle.next_dispatch);
    const now = new Date();
    const hoursUntilDispatch = (dispatchTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    // If dispatch is soon and SOC is below target
    if (hoursUntilDispatch < 4 && socGap > 20) {
      return 'high';
    }
    
    if (hoursUntilDispatch < 8 && socGap > 30) {
      return 'medium';
    }
  }
  
  return 'low';
}

/**
 * Calculate estimated charging time
 */
export function calculateChargingTime(
  currentSoc: number,
  targetSoc: number,
  batteryCapacity: number,
  chargingPower: number
): number {
  if (chargingPower <= 0 || currentSoc >= targetSoc) {
    return 0;
  }
  
  const energyNeeded = ((targetSoc - currentSoc) / 100) * batteryCapacity;
  const hours = energyNeeded / chargingPower;
  
  return Math.ceil(hours * 60); // Return minutes
}

/**
 * Format vehicle display name
 */
export function formatVehicleDisplayName(vehicle: Vehicle): string {
  return `${vehicle.vrn} - ${vehicle.make} ${vehicle.model}`;
}

/**
 * Check if vehicle needs immediate attention
 */
export function needsImmediateAttention(vehicle: Vehicle): boolean {
  return vehicle.soc < SOC_THRESHOLDS.CRITICAL || 
         (vehicle.priority === 'high' && vehicle.soc < SOC_THRESHOLDS.LOW);
}

/**
 * Sort vehicles by charging priority
 */
export function sortByChargingPriority(vehicles: Vehicle[]): Vehicle[] {
  return [...vehicles].sort((a, b) => {
    // First by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by SOC (lower SOC first)
    const socDiff = a.soc - b.soc;
    if (socDiff !== 0) return socDiff;
    
    // Then by next dispatch time (earlier first)
    if (a.next_dispatch && b.next_dispatch) {
      return new Date(a.next_dispatch).getTime() - new Date(b.next_dispatch).getTime();
    }
    
    return 0;
  });
}
