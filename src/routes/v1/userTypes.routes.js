import { Router } from 'express';
import { UserTypeController } from '@/controllers/v1/UserType.controller.js';
import { validateToken } from '@/middlewares/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(validateToken);

/**
 * Get all user types
 * @route GET /api/v1/user-types/get-all
 * @access Protected - Requires authentication
 * @returns {Array} - List of active user types
 */
router.get('/get-all', UserTypeController.getAllUserTypes);

export default router;
