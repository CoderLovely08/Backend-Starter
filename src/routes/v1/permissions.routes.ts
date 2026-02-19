import { Router } from 'express';
import { PermissionController } from '@/controllers/v1/Permission.controller.js';
import { higherOrderUserDataValidation } from '@/middlewares/validation.middleware.js';
import { ValidationSchema } from '@/schema/validation.schema.js';
import { validateToken, checkPermissions } from '@/middlewares/auth.middleware.js';
import { PERMISSIONS } from '@/utils/constants/permissions.constant.js';

const router = Router();

// All routes require authentication
router.use(validateToken);

/**
 * Route to get all permissions
 *
 * GET /api/v1/permissions/get-all
 * @access Protected - Requires permissions:read permission
 *
 * @returns {Array} - An array of permissions
 */
router.get(
  '/get-all',
  checkPermissions(PERMISSIONS.PERMISSIONS_READ),
  PermissionController.getAllPermissions,
);

/**
 * Route to create a new permission
 *
 * POST /api/v1/permissions/create
 * @access Protected - Requires permissions:create permission
 *
 * @param {Object} req.body - The request body
 * @param {string} req.body.name - The name of the permission
 * @param {string} req.body.description - The description of the permission
 *
 * @returns {Object} - The created permission
 */
router.post(
  '/create',
  checkPermissions(PERMISSIONS.PERMISSIONS_CREATE),
  higherOrderUserDataValidation(ValidationSchema.permissionSchema),
  PermissionController.createPermission,
);

/**
 * Route to assign permissions to a user
 *
 * POST /api/v1/permissions/assign-permissions
 * @access Protected - Requires permissions:assign permission
 *
 * @param {Object} req.body - The request body
 * @param {integer} req.body.userId - The id of the user
 * @param {integer} req.body.permissionId - The id of the permission
 *
 * @returns {Object} - The created permission
 */
router.post(
  '/assign-permissions',
  checkPermissions(PERMISSIONS.PERMISSIONS_ASSIGN),
  higherOrderUserDataValidation(ValidationSchema.assignPermissionsSchema),
  PermissionController.assignPermissions,
);

/**
 * Route to delete all permissions (DANGEROUS OPERATION)
 *
 * DELETE /api/v1/permissions/delete-all
 * @access Protected - Requires permissions:delete permission
 *
 * @returns {Object} - Success message
 */
router.delete(
  '/delete-all',
  checkPermissions(PERMISSIONS.PERMISSIONS_DELETE),
  PermissionController.deleteAllPermissions,
);

export default router;
