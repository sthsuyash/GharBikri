import express from 'express';
import { home } from '../controllers/home.controller.js';

const homeRoutes = express.Router();

// Define route for the home page
homeRoutes.get('/', home);

export default homeRoutes;