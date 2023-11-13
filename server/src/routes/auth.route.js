import express from 'express';
import {
    login,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendVerificationEmail,
} from '../controllers/auth.controller.js';

const authRoutes = express.Router();

// Register route
authRoutes.post('/register', register);
// Login route
authRoutes.post('/login', login);
// Verify email route
authRoutes.post('/verify-email/:token', verifyEmail);
// Forgot password route
authRoutes.post('/forgot-password', forgotPassword);
// Reset password route
authRoutes.post('/reset-password/:token', resetPassword);
// Resend verification email route
authRoutes.post('/resend-verification-email', resendVerificationEmail);

export default authRoutes;
