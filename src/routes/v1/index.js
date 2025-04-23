import { Router } from 'express';
import authRoutes from './auth.routes.js';
import permissionRoutes from './permissions.routes.js';

const router = Router();

// Auth Routes
router.use('/auth', authRoutes);

// Permission Routes
router.use('/permissions', permissionRoutes);

export default router;
