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

// Function to send an activation email
export const sendActivationEmail = async (email) => {
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
            .replace(`{{link}}`, `${DOMAIN}/auth/activate/${token}`)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending activation email:', error);
        } else {
            console.log('Activation email sent:', info.response);
        }
    });
}

// Function to create a token for the user
const createToken = (email) => {
    return jwt.sign({ email }, MAIL_SECRET, { expiresIn: '1d' });
}