import express from 'express';
import authRoutes from './authRoutes.js';
import homeRoutes from '../controllers/homeController.js';
import userRoutes from './userRoutes.js';
import propertyRoutes from './propertyRoutes.js';

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
