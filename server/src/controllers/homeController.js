import express from 'express';

const homeRoutes = express.Router();

// Define route for the home page
homeRoutes.get('/', (req, res) => {
    res.send('Welcome to GharBikri');
});

export default homeRoutes;