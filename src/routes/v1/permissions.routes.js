import { PermissionController } from '@/controllers/v1/Permission.controller.js';
import { Router } from 'express';

const router = Router();

/**
 * Route to get all permissions
 *
 * GET /api/v1/permissions/get-all
 *
 * @returns {Array} - An array of permissions
 */
router.get('/get-all', PermissionController.getAllPermissions);

export default router;
