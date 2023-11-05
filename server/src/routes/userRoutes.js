import express from 'express';
import { login, register, verifyEmail } from '../controllers/userController.js';

const userRouter = express.Router();

// User home page
userRouter.get('/', (req, res) => {
    res.send('User Home Page');
});

// User register route
userRouter.post('/auth/register', register);
userRouter.post('/auth/login', login);
userRouter.post('/auth/verify-email/:token', verifyEmail);

export default userRouter;