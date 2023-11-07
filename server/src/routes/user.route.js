import express from 'express';
import { bookVisit } from '../controllers/user.controller.js';

const userRoutes = express.Router();

// Book a visit to a property
userRoutes.post('/book-visit/:property_id', bookVisit);

export default userRoutes;