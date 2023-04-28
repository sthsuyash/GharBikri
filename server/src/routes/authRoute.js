const { Router } = require('express');
const { register, login, isVerify, getUsers, logout } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = Router();

// login route
router.post('/login', loginValidation, validationMiddleware, login);

// register route
router.post('/register', registerValidation, validationMiddleware, register);

// get users
router.get('/get-users', getUsers);

// logout route
router.get('/logout', logout);

// get route to test if verified
router.get('/is-verify', authMiddleware, isVerify);

module.exports = router;
