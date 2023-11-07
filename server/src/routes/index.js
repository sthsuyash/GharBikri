import express from 'express';
import authRoutes from './auth.route.js';
import homeRoutes from './home.route.js';
import userRoutes from './user.route.js';
import propertyRoutes from './property.route.js';

const router = express.Router();

// Define route for the home page
router.get('/', homeRoutes);

// Auth routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Property routes
router.use('/properties', propertyRoutes);

export default router;
