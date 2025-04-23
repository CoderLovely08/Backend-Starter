import { Router } from 'express';
import authRoutes from './auth.routes.js';
import permissionRoutes from './permissions.routes.js';
import userRoutes from './users.routes.js';
import { validateToken } from '@/middlewares/auth.middleware.js';
const router = Router();

// Auth Routes
router.use('/auth', authRoutes);

// Permission Routes
router.use('/permissions', permissionRoutes);

// User Routes
router.use('/users', validateToken, userRoutes);

export default router;
