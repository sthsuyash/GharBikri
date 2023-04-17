const { check } = require('express-validator');
const db = require('../db');
const { compare } = require('bcrypt');

// registration check

// check password
const password = check('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password has to be between 6 and 15 characters')
    .isAlphanumeric()
    .withMessage('Password needs to contain alphanumeric characters');

// email validation and
// check if email already exists
const email = check('user_email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail()
    .custom(async (value) => {
        const { rows } = await db.query("SELECT * FROM users WHERE user_email = $1", [value]);
        if (rows.length > 0) {
            throw new Error('Email already in use');
        }
    });

// check if username is entered or not and if it is already in use
const username = check('username')
    .isLength({ min: 3 })
    .withMessage('Please enter a valid username')
    .custom(async (value) => {
        const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [value]);
        if (rows.length > 0) {
            throw new Error('Username already in use');
        }
    });

// login validation
const loginFieldCheck = check('user_email')
    .custom(async (value, { req }) => {
        const user = await db.query("SELECT * FROM users WHERE user_email = $1", [value]);
        if (user.rows.length === 0) {
            throw new Error('Email not found');
        }

        const isMatch = await compare(req.body.password, user.rows[0].password);
        if (!isMatch) {
            throw new Error('Password is incorrect');
        }

        req.user = user.rows[0];
    });


module.exports = {
    registerValidation: [password, email, username],
    loginValidation: [loginFieldCheck],
}