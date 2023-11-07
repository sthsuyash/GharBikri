import asyncHandler from 'express-async-handler';
import prisma from "../config/prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendActivationEmail } from '../utils/mailer.js';
import { MAIL_SECRET } from '../config/env.js';

/**
 * Register user
 * 
 * @route POST /api/v2/auth/register
 * @group Auth - Operations about authentication
 * @param {string} email.body.required - Email of user
 * @param {string} password.body.required - Password of user
 * @returns {object} 201 - User registered successfully: Please check your email to activate your account
 * @returns {Error}  400 - Email already exists, Email and Password are required, Invalid credentials
 * @returns {Error}  500 - Internal server error
 */
export const register = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required." });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                UserProfile: {
                    create: {}
                }
            }
        });

        // Send email to user for activation
        await sendActivationEmail(user.email);

        res.status(201).json({
            message: "Please check your email to activate your account."
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Login user
 * 
 * @route POST /api/v2/auth/login
 * @group Auth - Operations about authentication
 * @param {string} email.body.required - Email of user
 * @param {string} password.body.required - Password of user
 * @returns {object} 200 - User logged in successfully
 * @returns {Error}  400 - Email and Password are required, User does not exist, Invalid credentials, Please verify your email to login
 * @returns {Error}  500 - Internal server error
 */
export const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required." });
        }

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        if (user.status !== "active") {
            return res.status(400).json({ message: "Please verify your email to login." });
        }

        user = await prisma.user.findUnique({
            where: { email },
            include: {
                UserProfile: true
            }
        });

        const userProfile = user.UserProfile;
        const isProfileComplete = !Object.values(userProfile).some((value) => value === null);

        res.status(200).json({
            id: user.id,
            email: user.email,
            status: user.status,
            isProfileComplete: isProfileComplete,
            message: "User logged in successfully"
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Verify email
 * 
 * @route GET /api/v2/auth/verify-email/{token}
 * @group Auth - Operations about authentication
 * @param {string} token.path.required - Token to verify email
 * @returns {object} 200 - Email verified successfully
 * @returns {Error}  500 - Internal server error
 */
export const verifyEmail = asyncHandler(async (req, res) => {
    try {
        const { token } = req.params;

        const { email } = jwt.verify(token, MAIL_SECRET);

        await prisma.user.update({
            where: { email },
            data: { status: "active" }
        });

        res.status(200).json({
            message: "Email verified successfully"
        });
    } catch (error) {
        console.error("Error verifying email");
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Forgot password
 * 
 * @route POST /api/v2/auth/forgot-password/{token}
 * @group Auth - Operations about authentication
 * @param {string} token.path.required - Token to reset password
 * @param {string} password.body.required - New password
 * @returns {object} 200 - Password reset successfully
 * @returns {Error}  400 - Password is required, User does not exist, Invalid token
 * @returns {Error}  500 - Internal server error
 */
export const forgotPassword = asyncHandler(async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required." });
        }

        const { email } = jwt.verify(token, MAIL_SECRET);

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        res.status(200).json({
            message: "Password reset successfully."
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Resend verification email
 * 
 * @route POST /api/v2/auth/resend-verification-email
 * @group Auth - Operations about authentication
 * @param {string} email.body.required - Email of user
 * @returns {object} 200 - Verification email sent successfully
 * @returns {Error}  400 - Email is required, User does not exist, Email already verified
 * @returns {Error}  500 - Internal server error
 */
export const resendVerificationEmail = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }

        if (user.status === "active") {
            return res.status(400).json({ message: "Email already verified." });
        }

        await sendActivationEmail(user.email);

        res.status(200).json({
            message: "Verification email sent successfully."
        });
    } catch (error) {
        console.error("Error resending verification email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
