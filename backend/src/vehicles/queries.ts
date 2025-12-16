import { queryOne, queryAll, query, buildWhereClause } from '../lib/connection_db';
import { generateUUID, getCurrentTimestamp } from '../lib/common_modules';
import { Vehicle, CreateVehicleData, UpdateVehicleData, VehicleFilters } from './types';

/**
 * Find all vehicles with pagination and filters
 */
export async function findAllVehicles(
  filters: VehicleFilters,
  limit: number,
  offset: number
): Promise<{ vehicles: Vehicle[]; total: number }> {
  const conditions: string[] = ['is_active = true'];
  const values: any[] = [];
  let paramIndex = 1;

  if (filters.depot_id) {
    conditions.push(`depot_id = $${paramIndex++}`);
    values.push(filters.depot_id);
  }

  if (filters.priority) {
    conditions.push(`priority = $${paramIndex++}`);
    values.push(filters.priority);
  }

  if (filters.soc_below !== undefined) {
    conditions.push(`soc < $${paramIndex++}`);
    values.push(filters.soc_below);
  }

  if (filters.search) {
    conditions.push(`(vrn ILIKE $${paramIndex} OR name ILIKE $${paramIndex} OR make ILIKE $${paramIndex} OR model ILIKE $${paramIndex})`);
    values.push(`%${filters.search}%`);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count
  const countSql = `SELECT COUNT(*) as total FROM vehicles ${whereClause}`;
  const countResult = await queryOne<{ total: string }>(countSql, values);
  const total = parseInt(countResult?.total || '0', 10);

  // Get paginated vehicles
  const sql = `
    SELECT v.*, d.name as depot_name
    FROM vehicles v
    LEFT JOIN depots d ON v.depot_id = d.id
    ${whereClause}
    ORDER BY v.created_at DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex}
  `;
  
  const vehicles = await queryAll<Vehicle>(sql, [...values, limit, offset]);

  return { vehicles, total };
}

/**
 * Find vehicle by ID
 */
export async function findVehicleById(id: string): Promise<Vehicle | null> {
  const sql = `
    SELECT v.*, d.name as depot_name
    FROM vehicles v
    LEFT JOIN depots d ON v.depot_id = d.id
    WHERE v.id = $1 AND v.is_active = true
  `;
  return queryOne<Vehicle>(sql, [id]);
}

/**
 * Find vehicle by VRN
 */
export async function findVehicleByVrn(vrn: string): Promise<Vehicle | null> {
  const sql = `
    SELECT * FROM vehicles
    WHERE vrn = $1 AND is_active = true
  `;
  return queryOne<Vehicle>(sql, [vrn.toUpperCase()]);
}

/**
 * Create a new vehicle
 */
export async function createVehicle(data: CreateVehicleData): Promise<Vehicle> {
  const id = generateUUID();
  const now = getCurrentTimestamp();

  const sql = `
    INSERT INTO vehicles (
      id, vrn, name, make, model, soc, target, depot_id, location, priority,
      next_dispatch, avg_cost_per_day, ac_max_power, dc_max_power, v2g_enabled,
      is_active, created_at, updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, true, $16, $16)
    RETURNING *
  `;

  const result = await queryOne<Vehicle>(sql, [
    id,
    data.vrn.toUpperCase(),
    data.name,
    data.make,
    data.model,
    data.soc || 100,
    data.target || 80,
    data.depot_id,
    data.location || 'Unknown',
    data.priority || 'medium',
    data.next_dispatch,
    data.avg_cost_per_day || 0,
    data.ac_max_power,
    data.dc_max_power,
    data.v2g_enabled || false,
    now,
  ]);

  if (!result) {
    throw new Error('Failed to create vehicle');
  }

  return result;
}

/**
 * Update a vehicle
 */
export async function updateVehicle(id: string, data: UpdateVehicleData): Promise<Vehicle> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  const updateableFields = [
    'vrn', 'name', 'make', 'model', 'soc', 'target', 'depot_id', 'location',
    'priority', 'next_dispatch', 'avg_cost_per_day', 'ac_max_power', 'dc_max_power', 'v2g_enabled'
  ];

  for (const field of updateableFields) {
    if (data[field as keyof UpdateVehicleData] !== undefined) {
      updates.push(`${field} = $${paramIndex++}`);
      let value = data[field as keyof UpdateVehicleData];
      if (field === 'vrn' && typeof value === 'string') {
        value = value.toUpperCase();
      }
      values.push(value);
    }
  }

  updates.push(`updated_at = $${paramIndex++}`);
  values.push(getCurrentTimestamp());
  values.push(id);

  const sql = `
    UPDATE vehicles
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex} AND is_active = true
    RETURNING *
  `;

  const result = await queryOne<Vehicle>(sql, values);
  if (!result) {
    throw new Error('Failed to update vehicle');
  }

  return result;
}

/**
 * Soft delete a vehicle
 */
export async function deleteVehicle(id: string): Promise<void> {
  const sql = `
    UPDATE vehicles
    SET is_active = false, updated_at = $1
    WHERE id = $2
  `;
  await query(sql, [getCurrentTimestamp(), id]);
}

/**
 * Find vehicles needing charge
 */
export async function findVehiclesNeedingCharge(threshold: number = 40): Promise<Vehicle[]> {
  const sql = `
    SELECT v.*, d.name as depot_name
    FROM vehicles v
    LEFT JOIN depots d ON v.depot_id = d.id
    WHERE v.is_active = true AND v.soc < $1
    ORDER BY v.soc ASC, v.priority DESC
  `;
  return queryAll<Vehicle>(sql, [threshold]);
}

/**
 * Update vehicle SOC
 */
export async function updateVehicleSoc(id: string, soc: number): Promise<Vehicle> {
  const sql = `
    UPDATE vehicles
    SET soc = $1, updated_at = $2
    WHERE id = $3 AND is_active = true
    RETURNING *
  `;
  const result = await queryOne<Vehicle>(sql, [soc, getCurrentTimestamp(), id]);
  if (!result) {
    throw new Error('Failed to update vehicle SOC');
  }
  return result;
}

/**
 * Find vehicles by depot
 */
export async function findVehiclesByDepot(depotId: string): Promise<Vehicle[]> {
  const sql = `
    SELECT * FROM vehicles
    WHERE depot_id = $1 AND is_active = true
    ORDER BY vrn ASC
  `;
  return queryAll<Vehicle>(sql, [depotId]);
}

/**
 * Get vehicle count by depot
 */
export async function getVehicleCountByDepot(depotId: string): Promise<number> {
  const sql = `
    SELECT COUNT(*) as count FROM vehicles
    WHERE depot_id = $1 AND is_active = true
  `;
  const result = await queryOne<{ count: string }>(sql, [depotId]);
  return parseInt(result?.count || '0', 10);
}

/**
 * Bulk update SOC for multiple vehicles
 */
export async function bulkUpdateSoc(updates: Array<{ id: string; soc: number }>): Promise<void> {
  const now = getCurrentTimestamp();
  
  for (const update of updates) {
    await query(
      'UPDATE vehicles SET soc = $1, updated_at = $2 WHERE id = $3',
      [update.soc, now, update.id]
    );
  }
}
