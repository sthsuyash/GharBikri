import dotenv from 'dotenv';
dotenv.config();

/* database configs */
export const DB_PORT = process.env.DB_PORT
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_HOST = process.env.DB_HOST

/* server configs */
export const SERVER_PORT = process.env.SERVER_PORT

/* jwt configs */
export const JWT = process.env.JWT_SECRET

/* mailer configs */
export const MAILER_SERVICE = process.env.MAILER_SERVICE
export const MAILER_USER = process.env.MAILER_USER
export const MAILER_PASS = process.env.MAILER_PASS
export const MAILER_FROM = process.env.MAILER_FROM
export const MAIL_SECRET = process.env.MAIL_SECRET

/* domain configs */
export const DOMAIN = process.env.DOMAIN
export const API_URL = process.env.DOMAIN + '/api/v2'
