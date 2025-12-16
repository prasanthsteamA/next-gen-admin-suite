import { body, param } from 'express-validator';

export const validateCreateVehicle = [
  body('vrn')
    .trim()
    .notEmpty()
    .withMessage('VRN is required')
    .isLength({ max: 20 })
    .withMessage('VRN must be less than 20 characters'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Vehicle name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('make')
    .trim()
    .notEmpty()
    .withMessage('Make is required')
    .isLength({ max: 50 })
    .withMessage('Make must be less than 50 characters'),
  body('model')
    .trim()
    .notEmpty()
    .withMessage('Model is required')
    .isLength({ max: 50 })
    .withMessage('Model must be less than 50 characters'),
  body('soc')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('SOC must be between 0 and 100'),
  body('target')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Target must be between 0 and 100'),
  body('depot_id')
    .optional()
    .isUUID()
    .withMessage('Invalid depot ID'),
  body('priority')
    .optional()
    .isIn(['high', 'medium', 'low'])
    .withMessage('Priority must be high, medium, or low'),
  body('ac_max_power')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('AC max power must be a positive number'),
  body('dc_max_power')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('DC max power must be a positive number'),
  body('v2g_enabled')
    .optional()
    .isBoolean()
    .withMessage('V2G enabled must be a boolean'),
];

export const validateUpdateVehicle = [
  param('id')
    .isUUID()
    .withMessage('Invalid vehicle ID'),
  body('vrn')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('VRN must be less than 20 characters'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('make')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Make must be less than 50 characters'),
  body('model')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Model must be less than 50 characters'),
  body('soc')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('SOC must be between 0 and 100'),
  body('target')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Target must be between 0 and 100'),
  body('depot_id')
    .optional()
    .isUUID()
    .withMessage('Invalid depot ID'),
  body('priority')
    .optional()
    .isIn(['high', 'medium', 'low'])
    .withMessage('Priority must be high, medium, or low'),
];

export const validateUpdateSoc = [
  param('id')
    .isUUID()
    .withMessage('Invalid vehicle ID'),
  body('soc')
    .isInt({ min: 0, max: 100 })
    .withMessage('SOC must be between 0 and 100'),
];
