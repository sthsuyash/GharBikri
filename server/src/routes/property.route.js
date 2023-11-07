import express from 'express';
import {
    getAllProperties,
    createProperty,
    getPropertyById,
    getMyProperties
} from '../controllers/property.controller.js';

const propertyRoutes = express.Router();

// Get list of all properties
propertyRoutes.get('/', getAllProperties);
// Create property by authenticated user
propertyRoutes.post('/', createProperty);
// Get all properties of authenticated user
propertyRoutes.get('/me', getMyProperties);
// Get property by id
propertyRoutes.get('/:id', getPropertyById);

export default propertyRoutes;