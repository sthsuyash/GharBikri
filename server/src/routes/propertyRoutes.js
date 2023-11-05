import express from 'express';

const propertyRoutes = express.Router();

// Property home page
propertyRoutes.get('/', (req, res) => {
    res.send('Property Home Page');
});

export default propertyRoutes;