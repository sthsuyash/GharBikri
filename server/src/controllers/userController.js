import asyncHandler from 'express-async-handler';
import prisma from "../config/prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendActivationEmail } from '../utils/mailer.js';
import { MAIL_SECRET } from '../config/env.js';

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
            message: "Please check your email to activate your account"
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login user
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