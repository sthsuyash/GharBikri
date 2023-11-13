import nodemailer from 'nodemailer';
import {
    DOMAIN,
    // MAILER_SERVICE,
    MAILER_HOST,
    MAILER_PORT,
    MAILER_SECURE,
    MAILER_USER,
    MAILER_PASS,
    MAILER_FROM,
    MAIL_SECRET
} from '../config/env.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import asyncHandler from 'express-async-handler';

/**
 * Function to create a token using the user's email
 * 
 * @param {String} email
 * @returns {String} token
 * 
 */
const createToken = (email) => {
    return jwt.sign({ email }, MAIL_SECRET, { expiresIn: '1d' });
}

/**
* NodeMailer transporter
*/
const transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: MAILER_PORT,
    secure: MAILER_SECURE, // true for 465, false for other ports
    auth: {
        user: MAILER_USER,
        pass: MAILER_PASS
    }
});

/**
 * Function to send an activation email to the user
 * 
 * @param {String} email
 * @returns {void}
 * 
 */
export const sendActivationEmail = asyncHandler(async (email) => {
    const token = createToken(email);

    const htmlTemplate = fs.readFileSync('./src/templates/welcome.html', 'utf8');

    const mailOptions = {
        from: MAILER_FROM,
        to: email,
        subject: 'Welcome to GharBikri',
        html: htmlTemplate
            .replace(/{{email}}/g, email)
            .replace(/{{link}}/g, `${DOMAIN}/activate/${token}`)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Activation email sent: ${info.response}`);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
});

/**
 * Function to send a forgot password email to the user
 * 
 * @param {String} email
 * @returns {void}
 * 
 */
export const sendForgotPasswordEmail = asyncHandler(async (email) => {
    const token = createToken(email);

    const htmlTemplate = fs.readFileSync('./src/templates/forgot-password.html', 'utf8');

    const mailOptions = {
        from: MAILER_FROM,
        to: email,
        subject: 'Reset your password',
        html: htmlTemplate
            .replace(/{{email}}/g, email)
            .replace(/{{resetLink}}/g, `${DOMAIN}/reset-password/${token}`)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Forgot password email sent: ${info.response}`);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
});