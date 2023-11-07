import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";
import { paginate } from "../utils/pagination.js";
import { API_URL } from "../config/env.js";

const api_name = `${API_URL}/user`;

/**
 * Get all visits of the authenticated user
 * 
 * @route GET /user/visits/me
 * @group User - Operations about user
 * @returns {object} 200 - An array of visits
 * @returns {Error}  default - Unexpected error
 * @security JWT
 * 
 */
export const getMyVisits = asyncHandler(async (req, res) => {
    try {
        // get the authenticated user id
        const user_id = req.user.id;
        const page = parseInt(req.query.page) || 1;
        // condition that only returns visits of the authenticated user
        const conditions = {
            where: {
                user_id
            },
            select: {
                property: true,
                user_profile: true
            }
        };
        const visits = await paginate("visit", `${api_name}/visits`, page, conditions);
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/**
 * Get all bookmarked properties of the authenticated user
 * 
 * @route GET /user/bookmark/me
 * @group User - Operations about user
 * @returns {object} 200 - An array of bookmarked properties
 * @returns {Error}  default - Unexpected error
 * @security JWT
 * 
 */
export const getMyBookmarks = asyncHandler(async (req, res) => {
    try {
        // get the authenticated user id
        const user_id = req.user.id;
        const page = parseInt(req.query.page) || 1;
        // condition that only returns bookmarked properties of the authenticated user
        const conditions = {
            where: {
                user_id
            },
            select: {
                property: true
            }
        };
        const bookmarks = await paginate("bookmark", `${api_name}/bookmarks`, page, conditions);
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/**
 * Bookmark a property
 * 
 * @route POST /user/bookmark/:property_id
 * @group User - Operations about user
 * @param {string} property_id.path.required - Property id
 * @returns {object} 200 - Bookmark object
 * @returns {Error}  default - Unexpected error
 * @security JWT
 *  
 */
export const createBookmark = asyncHandler(async (req, res) => {
    try {
        // get the authenticated user id
        const user_id = req.user.id;

        const { property_id } = req.params;

        // check if the property exists
        const property = await prisma.property.findUnique({
            where: {
                id: property_id
            }
        });
        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        // check if the property belongs to the authenticated user, if yes then return error
        if (property.user_id === user_id) {
            return res.status(400).json({
                message: "You cannot bookmark your own property"
            });
        }

        // check if the property is already bookmarked by the authenticated user
        const bookmark = await prisma.bookmark.findUnique({
            where: {
                property_id_user_id: {
                    property_id,
                    user_id
                }
            }
        });
        if (bookmark) {
            return res.status(400).json({
                message: "Property already bookmarked"
            });
        }

        // create the bookmark
        const newBookmark = await prisma.bookmark.create({
            data: {
                property_id,
                user_id
            }
        });
        res.status(200).json({ message: "Property bookmarked", bookmark: newBookmark });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/**
 * Delete a bookmark
 * 
 * @route DELETE /user/bookmark/:property_id
 * @group User - Operations about user
 * @param {string} property_id.path.required - Property id
 * @returns {object} 200 - Bookmark object
 * @returns {Error}  default - Unexpected error
 * @security JWT
 *
 */
export const removeBookmark = asyncHandler(async (req, res) => {
    try {
        // get the authenticated user id
        const user_id = req.user.id;
        const { property_id } = req.params;
        // check if the property exists
        const property = await prisma.property.findUnique({
            where: {
                id: property_id
            }
        });
        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }
        // check if the property is already bookmarked by the authenticated user
        const bookmark = await prisma.bookmark.findUnique({
            where: {
                property_id_user_id: {
                    property_id,
                    user_id
                }
            }
        });
        if (!bookmark) {
            return res.status(400).json({
                message: "Property not bookmarked"
            });
        }

        // delete the bookmark
        await prisma.bookmark.delete({
            where: {
                id: bookmark.id
            }
        });
        res.status(200).json({ message: "Property bookmark removed" });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});