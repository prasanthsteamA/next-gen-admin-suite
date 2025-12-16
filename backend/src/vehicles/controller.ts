import { Response } from 'express';
import { AuthenticatedRequest } from '../auth/middleware';
import { sendSuccess, sendPaginatedSuccess, sendError, sendNotFound, parsePaginationParams, calculatePagination } from '../lib/common_modules';
import { settings } from '../settings';
import { HTTP_STATUS } from '../lib/constants';
import { validationResult } from 'express-validator';
import * as queries from './queries';

/**
 * Get all vehicles with pagination and filters
 */
export async function getAllVehicles(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const { page, pageSize, offset } = parsePaginationParams(req.query, settings.pagination);
    
    const filters = {
      depot_id: req.query.depot_id as string,
      priority: req.query.priority as string,
      soc_below: req.query.soc_below ? parseInt(req.query.soc_below as string, 10) : undefined,
      search: req.query.search as string,
    };

    const { vehicles, total } = await queries.findAllVehicles(filters, pageSize, offset);
    const pagination = calculatePagination(total, page, pageSize);

    return sendPaginatedSuccess(res, vehicles, pagination);
  } catch (error) {
    console.error('Get all vehicles error:', error);
    return sendError(res, 'Failed to fetch vehicles');
  }
}

/**
 * Get vehicle by ID
 */
export async function getVehicleById(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const vehicle = await queries.findVehicleById(id);

    if (!vehicle) {
      return sendNotFound(res, 'Vehicle not found');
    }

    return sendSuccess(res, vehicle);
  } catch (error) {
    console.error('Get vehicle by ID error:', error);
    return sendError(res, 'Failed to fetch vehicle');
  }
}

/**
 * Create a new vehicle
 */
export async function createVehicle(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const vehicle = await queries.createVehicle(req.body);
    return sendSuccess(res, vehicle, 'Vehicle created successfully', HTTP_STATUS.CREATED);
  } catch (error) {
    console.error('Create vehicle error:', error);
    return sendError(res, 'Failed to create vehicle');
  }
}

/**
 * Update a vehicle
 */
export async function updateVehicle(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { id } = req.params;
    const existing = await queries.findVehicleById(id);

    if (!existing) {
      return sendNotFound(res, 'Vehicle not found');
    }

    const vehicle = await queries.updateVehicle(id, req.body);
    return sendSuccess(res, vehicle, 'Vehicle updated successfully');
  } catch (error) {
    console.error('Update vehicle error:', error);
    return sendError(res, 'Failed to update vehicle');
  }
}

/**
 * Delete a vehicle
 */
export async function deleteVehicle(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const existing = await queries.findVehicleById(id);

    if (!existing) {
      return sendNotFound(res, 'Vehicle not found');
    }

    await queries.deleteVehicle(id);
    return sendSuccess(res, null, 'Vehicle deleted successfully');
  } catch (error) {
    console.error('Delete vehicle error:', error);
    return sendError(res, 'Failed to delete vehicle');
  }
}

/**
 * Get vehicles needing charge
 */
export async function getVehiclesNeedingCharge(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const threshold = parseInt(req.query.threshold as string, 10) || 40;
    const vehicles = await queries.findVehiclesNeedingCharge(threshold);
    return sendSuccess(res, vehicles);
  } catch (error) {
    console.error('Get vehicles needing charge error:', error);
    return sendError(res, 'Failed to fetch vehicles needing charge');
  }
}

/**
 * Update vehicle SOC
 */
export async function updateVehicleSoc(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { id } = req.params;
    const { soc } = req.body;

    const existing = await queries.findVehicleById(id);
    if (!existing) {
      return sendNotFound(res, 'Vehicle not found');
    }

    const vehicle = await queries.updateVehicleSoc(id, soc);
    return sendSuccess(res, vehicle, 'SOC updated successfully');
  } catch (error) {
    console.error('Update vehicle SOC error:', error);
    return sendError(res, 'Failed to update vehicle SOC');
  }
}

/**
 * Get vehicles by depot
 */
export async function getVehiclesByDepot(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    const { depotId } = req.params;
    const vehicles = await queries.findVehiclesByDepot(depotId);
    return sendSuccess(res, vehicles);
  } catch (error) {
    console.error('Get vehicles by depot error:', error);
    return sendError(res, 'Failed to fetch vehicles');
  }
}
