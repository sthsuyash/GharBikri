import express from 'express';

const userRoutes = express.Router();

// User home page
userRoutes.get('/', (req, res) => {
    res.send('User Home Page');
});

export default userRoutes;