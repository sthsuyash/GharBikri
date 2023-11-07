import express from 'express';
import { login, register, verifyEmail } from '../controllers/auth.controller.js';

const authRoutes = express.Router();

// Register route
authRoutes.post('/register', register);
// Login route
authRoutes.post('/login', login);
// Verify email route
authRoutes.post('/verify-email/:token', verifyEmail);

export default authRoutes;
