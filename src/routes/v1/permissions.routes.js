import { Router } from 'express';
import { PermissionController } from '@/controllers/v1/Permission.controller.js';
import { higherOrderUserDataValidation } from '@/middlewares/validation.middleware.js';
import { ValidationSchema } from '@/schema/validation.schema.js';

const router = Router();

/**
 * Route to get all permissions
 *
 * GET /api/v1/permissions/get-all
 *
 * @returns {Array} - An array of permissions
 */
router.get('/get-all', PermissionController.getAllPermissions);

/**
 * Route to create a new permission
 *
 * POST /api/v1/permissions/create
 *
 * @param {Object} req.body - The request body
 * @param {string} req.body.name - The name of the permission
 * @param {string} req.body.description - The description of the permission
 *
 * @returns {Object} - The created permission
 */
router.post(
  '/create',
  higherOrderUserDataValidation(ValidationSchema.permissionSchema),
  PermissionController.createPermission,
);

export default router;
