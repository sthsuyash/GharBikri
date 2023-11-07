import express from 'express';

const userRoutes = express.Router();

import {
    getMyVisits,
    getMyBookmarks,
    createBookmark,
    removeBookmark
} from '../controllers/user.controller.js';

// Get all visits of the authenticated user
userRoutes.get('/visits/me', getMyVisits);
// Get all bookmarked properties of the authenticated user
userRoutes.get('/bookmark/me', getMyBookmarks);
// Create a bookmark by authenticated user
userRoutes.post('/bookmark/:property_id', createBookmark);
// Delete a bookmark by authenticated user
userRoutes.delete('/bookmark/:property_id', removeBookmark);

export default userRoutes;