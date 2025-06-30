import { Router } from 'express';
import { UserController } from '@/controllers/v1/User.controller.js';
import { validateRequestParams } from '@/middlewares/validation.middleware.js';
import { ValidationSchema } from '@/schema/validation.schema.js';

const router = Router();

/**
 * Get all users
 * @route GET /api/v1/users/get-all
 * @returns {Object} 200 - A list of users
 */
router.get('/get-all', UserController.getAllUsers);

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

  UserController.getUserById,
);

/**
 * Create a user
 * @route POST /api/v1/users/create
 * @returns {Object} 200 - A user
 */
router.post('/create', UserController.createUser);

/**
 * Update a user
 * @route PUT /api/v1/users/:id
 * @returns {Object} 200 - A user
 */
router.put('/:id', UserController.updateUser);

/**
 * Delete a user
 * @route DELETE /api/v1/users/:id
 * @returns {Object} 200 - A user
 */
router.delete('/:id', UserController.deleteUser);

export default router;
