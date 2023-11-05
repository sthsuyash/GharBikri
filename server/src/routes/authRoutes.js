import express from 'express';
import { login, register, verifyEmail } from '../controllers/authController.js';

const authRoutes = express.Router();

// Auth home page
authRoutes.get('/', (req, res) => {
    res.send('Auth Page');
});

// Register route
authRoutes.post('/register', register);
// Login route
authRoutes.post('/login', login);
// Verify email route
authRoutes.post('/verify-email/:token', verifyEmail);

export default authRoutes;