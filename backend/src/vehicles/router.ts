import { Router } from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiclesNeedingCharge,
  updateVehicleSoc,
  getVehiclesByDepot,
} from './controller';
import { verifyToken, requireRoles } from '../auth/middleware';
import { validateCreateVehicle, validateUpdateVehicle, validateUpdateSoc } from './validation';

const vehiclesRouter = Router();

// Apply authentication to all routes
vehiclesRouter.use(verifyToken);

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     tags: [Vehicles]
 *     summary: Get all vehicles
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: pageSize
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: depot_id
 *         schema: { type: string }
 *       - in: query
 *         name: priority
 *         schema: { type: string, enum: [high, medium, low] }
 *       - in: query
 *         name: soc_below
 *         schema: { type: integer }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of vehicles }
 */
vehiclesRouter.get('/', getAllVehicles);

/**
 * @swagger
 * /api/v1/vehicles/needing-charge:
 *   get:
 *     tags: [Vehicles]
 *     summary: Get vehicles that need charging
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema: { type: integer, default: 40 }
 *     responses:
 *       200: { description: List of vehicles needing charge }
 */
vehiclesRouter.get('/needing-charge', getVehiclesNeedingCharge);

/**
 * @swagger
 * /api/v1/vehicles/by-depot/{depotId}:
 *   get:
 *     tags: [Vehicles]
 *     summary: Get vehicles by depot
 *     parameters:
 *       - in: path
 *         name: depotId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of vehicles in depot }
 */
vehiclesRouter.get('/by-depot/:depotId', getVehiclesByDepot);

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   get:
 *     tags: [Vehicles]
 *     summary: Get vehicle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Vehicle details }
 *       404: { description: Vehicle not found }
 */
vehiclesRouter.get('/:id', getVehicleById);

/**
 * @swagger
 * /api/v1/vehicles:
 *   post:
 *     tags: [Vehicles]
 *     summary: Create a new vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201: { description: Vehicle created }
 *       400: { description: Validation error }
 */
vehiclesRouter.post('/', requireRoles('admin', 'manager'), validateCreateVehicle, createVehicle);

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   put:
 *     tags: [Vehicles]
 *     summary: Update a vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200: { description: Vehicle updated }
 *       404: { description: Vehicle not found }
 */
vehiclesRouter.put('/:id', requireRoles('admin', 'manager'), validateUpdateVehicle, updateVehicle);

/**
 * @swagger
 * /api/v1/vehicles/{id}/soc:
 *   patch:
 *     tags: [Vehicles]
 *     summary: Update vehicle SOC
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               soc: { type: number, minimum: 0, maximum: 100 }
 *     responses:
 *       200: { description: SOC updated }
 */
vehiclesRouter.patch('/:id/soc', validateUpdateSoc, updateVehicleSoc);

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   delete:
 *     tags: [Vehicles]
 *     summary: Delete a vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Vehicle deleted }
 *       404: { description: Vehicle not found }
 */
vehiclesRouter.delete('/:id', requireRoles('admin'), deleteVehicle);

export default vehiclesRouter;
