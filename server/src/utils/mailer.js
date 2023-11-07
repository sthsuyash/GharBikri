import nodemailer from 'nodemailer';
import {
    DOMAIN,
    MAILER_SERVICE,
    MAILER_USER,
    MAILER_PASS,
    MAILER_FROM,
    MAIL_SECRET
} from '../config/env.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import asyncHandler from 'express-async-handler';

/**
 * Function to send an activation email to the user
 * 
 * @param {String} email
 * @returns {void}
 * 
 */
export const sendActivationEmail = asyncHandler(async (email) => {
    const transporter = nodemailer.createTransport({
        service: MAILER_SERVICE,
        auth: {
            user: MAILER_USER,
            pass: MAILER_PASS
        }
    });

    const token = createToken(email);

    const htmlTemplate = fs.readFileSync('./src/templates/welcome.html', 'utf8');

    const mailOptions = {
        from: MAILER_FROM,
        to: email,
        subject: 'Welcome to GharBikri',
        html: htmlTemplate
            .replace(`{{email}}`, email)
            .replace(`{{link}}`, `${DOMAIN}/activate/${token}`)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Activation email sent: ${info.response}`);
    } catch (error) {
        console.log(error);
    }
});

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
