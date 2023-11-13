import express from 'express';
import {
    getAllProperties,
    createProperty,
    getPropertyById,
    getMyProperties,

    bookVisit,
    cancelVisit,
    getVisitsOfMyProperties,
    toggleAvailabilityStatus,
    updatePropertyById,
    deletePropertyById
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
// Toggle property availability status by authenticated user
propertyRoutes.patch('/:id', toggleAvailabilityStatus);
// Update property by id
propertyRoutes.put('/:id', updatePropertyById);
// Delete property by id
propertyRoutes.delete('/:id', deletePropertyById);

// Book a visit to a property
propertyRoutes.post('/book-visit/:property_id', bookVisit);
// Get all visits of property for owner
propertyRoutes.get('/my-visits', getVisitsOfMyProperties);
// Delete a visit
propertyRoutes.delete('/visit/:visit_id', cancelVisit);

export default propertyRoutes;