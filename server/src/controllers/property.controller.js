import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";
import { paginate } from "../utils/pagination.js";
import { API_URL } from "../config/env.js";

const api_name = `${API_URL}/properties`;

/**
 * Get all properties
 * 
 * @route GET /api/v2/property
 * @group Property - Operations about property
 * @returns {object} 200 - An array of properties
 * @returns {Error}  500 - Internal server error
 *
 */
export const getAllProperties = asyncHandler(async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 0;
        const properties = await paginate('property', `${api_name}`, page);
        res.status(200).json(properties);
    } catch (error) {
        console.error("Error getting properties:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Create property
 * 
 * @route POST /api/v2/property
 * @group Property - Operations about property
 * @param {string} name.body.required - Name of property
 * @param {string} description.body.required - Description of property
 * @param {number} price.body.required - Price of property
 * @param {string} street_num.body.required - Street number of property
 * @param {string} street_name.body.required - Street name of property
 * @param {string} city.body.required - City of property
 * @param {string} state.body.required - State of property
 * @param {string} type.body.required - Type of property
 * @param {number} bed.body.required - Number of bedrooms in property
 * @param {number} bath.body.required - Number of bathrooms in property
 * @param {number} area_sq_ft.body.required - Area of property in square feet
 * @param {string} repair_quality.body.required - Repair quality of property
 * @param {number} year.body.required - Built Year of property
 * @param {string} listingType.body.required - Listing type of property
 * @param {string} availability_status.body.required - Availability status of property
 * @param {string} images.body.required - Images of property
 * @param {string} facilities.body.required - Facilities of property
 * @param {string} location.body.required - Location of property
 * @returns {object} 201 - Property created successfully
 * @returns {Error}  400 - All fields are required
 * @returns {Error}  500 - Internal server error
 * 
 */
export const createProperty = asyncHandler(async (req, res) => {
    // Get user id from token
    // const id = req.user.id;

    // Get all fields from req.body
    const {
        name,
        description,
        street_num,
        street_name,
        city,
        state,
        type,
        bed,
        bath,
        area_sq_ft,
        repair_quality,
        year,
        price,
        listingType,
        availability_status,
        images,
        facilities,

        id
    } = req.body;

    // Check if all fields are not empty
    Object.values(req.body).forEach((value) => {
        if (value === null || value === "") {
            return res.status(400).json({ message: "All fields are required." });
        }
    });

    try {
        // Create property
        const property = await prisma.property.create({
            data: {
                name,
                description,
                street_num,
                street_name,
                city,
                state,
                type,
                bed,
                bath,
                area_sq_ft,
                repair_quality,
                year,
                price,
                listingType,
                availability_status,
                images,
                facilities,
                user_profile: {
                    connect: { id },
                },
            }
        });

        await prisma.userProfile.update({
            where: { id },
            data: { property_count: { increment: 1 } }
        });

        res.status(201).json({ message: "Property created successfully.", property });
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({ message: "Property already exists." });
        }
        console.error("Error creating property:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Get property by id
 * 
 * @route GET /api/v2/property/{id}
 * @group Property - Operations about property
 * @param {string} id.path.required - Property id
 * @returns {object} 200 - Property found successfully
 * @returns {Error}  404 - Property not found
 * @returns {Error}  500 - Internal server error
 * 
 */
export const getPropertyById = asyncHandler(async (req, res) => {
    // Get property id from req.params
    const { id } = req.params;

    try {
        // Get property by id
        const property = await prisma.property.findUnique({
            where: { id },
        });

        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        res.status(200).json({ property });
    } catch (error) {
        console.error("Error getting property:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});

/**
 * Get all properties of authenticated user
 * 
 * @route GET /api/v2/property/me
 * @group Property - Operations about property
 * @returns {object} 200 - An array of properties
 * @returns {Error}  500 - Internal server error
 * 
 */
export const getMyProperties = asyncHandler(async (req, res) => {
    // Get user id from token
    const id = req.user.id;

    try {
        // Pagination
        const page = parseInt(req.query.page) || 0;
        const conditions = { user_id: id };
        const properties = await paginate('property', `${api_name}/me`, page, conditions);
        res.status(200).json(properties);
    }
    catch (error) {
        console.error("Error getting properties:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});