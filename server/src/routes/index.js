import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Define route for the home page
router.get('/', (req, res) => {
    res.send('Home Page');
});

// User routes
router.use('/user', userRoutes);

export default router;
