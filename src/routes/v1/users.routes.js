import { Router } from 'express';
import { UserController } from '@/controllers/v1/User.controller.js';
import {
  higherOrderUserDataValidation,
  validateRequestParams,
} from '@/middlewares/validation.middleware.js';
import { ValidationSchema } from '@/schema/validation.schema.js';
import { checkPermissions } from '@/middlewares/auth.middleware.js';
import { PERMISSIONS } from '@/utils/constants/permissions.constant.js';

const router = Router();

/**
 * Get all users
 * @route GET /api/v1/users/get-all
 * @access Protected - Requires users:read permission
 * @returns {Object} 200 - A list of users
 */
router.get(
  '/get-all',
  checkPermissions(PERMISSIONS.USERS_READ),
  UserController.getAllUsers,
);

/**
 * Get a mock data
 * @route GET /api/v1/users/get-mock
 * @access Protected - Requires users:read permission
 * @returns {Object} 200 - A mock data
 */
router.get(
  '/get-mock',
  checkPermissions(PERMISSIONS.USERS_READ),
  UserController.getMock,
);

/**
 * Get a user by id
 * @route GET /api/v1/users/:id
 * @access Protected - Requires users:read permission
 * @returns {Object} 200 - A user
 */
router.get(
  '/:id',
  validateRequestParams(ValidationSchema.idSchema),
  checkPermissions(PERMISSIONS.USERS_READ),
  UserController.getUserById,
);

/**
 * Create a user
 * @route POST /api/v1/users/create
 * @access Protected - Requires users:create permission
 * @returns {Object} 201 - Created user
 */
router.post(
  '/create',
  checkPermissions(PERMISSIONS.USERS_CREATE),
  higherOrderUserDataValidation(ValidationSchema.createUserSchema),
  UserController.createUser,
);

/**
 * Update a user
 * @route PUT /api/v1/users/:id
 * @access Protected - Requires users:update permission
 * @returns {Object} 200 - Updated user
 */
router.put(
  '/:id',
  validateRequestParams(ValidationSchema.idSchema),
  checkPermissions(PERMISSIONS.USERS_UPDATE),
  higherOrderUserDataValidation(ValidationSchema.updateUserSchema),
  UserController.updateUser,
);

/**
 * Delete a user
 * @route DELETE /api/v1/users/:id
 * @access Protected - Requires users:delete permission
 * @returns {Object} 200 - Success message
 */
router.delete(
  '/:id',
  validateRequestParams(ValidationSchema.idSchema),
  checkPermissions(PERMISSIONS.USERS_DELETE),
  UserController.deleteUser,
);

export default router;
