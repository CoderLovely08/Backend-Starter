import { Router } from 'express';
import { UserController } from '@/controllers/v1/User.controller.js';
import { checkPermissions } from '@/middlewares/auth.middleware.js';
import { PERMISSIONS } from '@/utils/constants/db.constants.js';
import { validateRequestParams } from '@/middlewares/validation.middleware.js';
import { ValidationSchema } from '@/schema/validation.schema.js';

const router = Router();

/**
 * Get all users
 * @route GET /api/v1/users/get-all
 * @returns {Object} 200 - A list of users
 */
router.get('/get-all', checkPermissions(PERMISSIONS.USER_READ), UserController.getAllUsers);

/**
 * Get a mock data
 * @route GET /api/v1/users/get-mock
 * @returns {Object} 200 - A mock data
 */
router.get('/get-mock', UserController.getMock);

/**
 * Get a user by id
 * @route GET /api/v1/users/:id
 * @returns {Object} 200 - A user
 */
router.get(
  '/:id',
  validateRequestParams(ValidationSchema.idSchema),
  checkPermissions(PERMISSIONS.USER_READ),
  UserController.getUserById,
);

/**
 * Create a user
 * @route POST /api/v1/users/create
 * @returns {Object} 200 - A user
 */
router.post('/create', checkPermissions(PERMISSIONS.USER_CREATE), UserController.createUser);

/**
 * Update a user
 * @route PUT /api/v1/users/:id
 * @returns {Object} 200 - A user
 */
router.put('/:id', checkPermissions(PERMISSIONS.USER_UPDATE), UserController.updateUser);

/**
 * Delete a user
 * @route DELETE /api/v1/users/:id
 * @returns {Object} 200 - A user
 */
router.delete('/:id', checkPermissions(PERMISSIONS.USER_DELETE), UserController.deleteUser);

export default router;
