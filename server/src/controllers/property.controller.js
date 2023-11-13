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
        const page = parseInt(req.query.page) || 1;
        // condition that property is available and does not belong to the user, if user is authenticated
        const conditions = req.user ?
            {
                where: {
                    availability_status: true,
                    user_id: {
                        not: req.user.id
                    },
                }
            } : {
                where: {
                    availability_status: true
                }
            };
        const properties = await paginate('property', `${api_name}`, page, conditions);
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
    const { id } = req.user;

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
    } = req.body;

    // Check if all fields are not empty
    Object.values(req.body).forEach((value) => {
        if (value === null || value === "") {
            return res.status(400).json({ message: "All fields are required." });
        }
    });

    // Check if the user exists
    const user = await prisma.userProfile.findUnique({ where: { id } });
    if (!user) {
        return res.status(400).json({ message: "User does not exist." });
    }

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
        // also get the user who owns the property
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                user_profile: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone: true,
                        profile_pic: true,
                        property_count: true,
                    }
                }
            }
        });

        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        // update the view count of the property in property table if the user is not the owner
        if (req.user && property.user_id !== req.user.id) {
            await prisma.property.update({
                where: { id },
                data: { view_count: { increment: 1 } }
            });
        }

        res.status(200).json({ property });
    } catch (error) {
        console.error("Error getting property:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});

/**
 * Update property by id if it belongs to the authenticated user
 * 
 * @route PUT /api/v2/property/{id}
 * @group Property - Operations about property
 * @param {string} id.path.required - Property id
 * @param {string} name.body - Name of property
 * @param {string} description.body - Description of property
 * @param {number} price.body - Price of property
 * @param {string} street_num.body - Street number of property
 * @param {string} street_name.body - Street name of property
 * @param {string} city.body - City of property
 * @param {string} state.body - State of property
 * @param {string} type.body - Type of property
 * @param {number} bed.body - Number of bedrooms in property
 * @param {number} bath.body - Number of bathrooms in property
 * @param {number} area_sq_ft.body - Area of property in square feet
 * @param {string} repair_quality.body - Repair quality of property
 * @param {number} year.body - Built Year of property
 * @param {string} listingType.body - Listing type of property
 * @param {string} availability_status.body - Availability status of property
 * @param {string} images.body - Images of property
 * @param {string} facilities.body - Facilities of property
 * @param {string} location.body - Location of property
 * @returns {object} 200 - Property updated successfully
 * @returns {Error}  400 - Property does not exist
 * @returns {Error}  400 - Property does not belong to you
 * @returns {Error}  500 - Internal server error
 * @security JWT
 * 
    */
export const updatePropertyById = asyncHandler(async (req, res) => {
    // Get property id from req.params
    const { id } = req.params;

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
    } = req.body;

    // Check if the property exists
    const property = await prisma.property.findUnique({
        where: { id },
    });
    if (!property) {
        return res.status(400).json({ message: "Property does not exist." });
    }

    // Check if the property belongs to the authenticated user
    if (property.user_id !== req.user.id) {
        return res.status(400).json({ message: "Property does not belong to you." });
    }

    try {
        // Update property
        const updatedProperty = await prisma.property.update({
            where: { id },
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
            },
        });

        res.status(200).json({ message: "Property updated successfully.", updatedProperty });
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Delete property by id if it belongs to the authenticated user
 *  
 * @route DELETE /api/v2/property/{id}
 * @group Property - Operations about property
 * @param {string} id.path.required - Property id
 * @returns {object} 200 - Property deleted successfully
 * @returns {Error}  400 - Property does not exist
 * @returns {Error}  400 - Property does not belong to you
 * @returns {Error}  500 - Internal server error
 * @security JWT
 *  
 */
export const deletePropertyById = asyncHandler(async (req, res) => {
    // Get property id from req.params
    const { id } = req.params;

    // Check if the property exists
    const property = await prisma.property.findUnique({
        where: { id },
    });
    if (!property) {
        return res.status(400).json({ message: "Property does not exist." });
    }

    // Check if the property belongs to the authenticated user
    if (property.user_id !== req.user.id) {
        return res.status(400).json({ message: "Property does not belong to you." });
    }

    try {
        // Delete property
        await prisma.property.delete({
            where: { id },
        });

        await prisma.userProfile.update({
            where: { id: req.user.id },
            data: { property_count: { decrement: 1 } }
        });

        res.status(200).json({ message: "Property deleted successfully." });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Toggle availability status of property by id if it belongs to the authenticated user
 * 
 * @route PUT /api/v2/property/toggle-availability/{id}
 * @group Property - Operations about property
 * @param {string} id.path.required - Property id
 * @returns {object} 200 - Availability status toggled successfully
 * @returns {Error}  400 - Property does not exist
 * @returns {Error}  400 - Property does not belong to you
 * @returns {Error}  500 - Internal server error
 * @security JWT
 * 
 */
export const toggleAvailabilityStatus = asyncHandler(async (req, res) => {
    // Get property id from req.params
    const { id } = req.params;

    // Check if the property exists
    const property = await prisma.property.findUnique({
        where: { id },
    });
    if (!property) {
        return res.status(400).json({ message: "Property does not exist." });
    }

    // Check if the property belongs to the authenticated user
    if (property.user_id !== req.user.id) {
        return res.status(400).json({ message: "Property does not belong to you." });
    }

    try {
        // Toggle availability status
        const updatedProperty = await prisma.property.update({
            where: { id },
            data: {
                availability_status: !property.availability_status,
            },
        });

        res.status(200).json({ message: "Availability status toggled successfully.", updatedProperty });
    } catch (error) {
        console.error("Error toggling availability status:", error);
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
        const conditions = {
            where: {
                user_id: id
            }
        };
        const properties = await paginate('property', `${api_name}/me`, page, conditions);
        res.status(200).json(properties);
    }
    catch (error) {
        console.error("Error getting properties:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Book a visit to a property
 * 
 * @route POST /api/v2/property/book-visit/{property_id}
 * @group Property - Operations about property
 * @param {string} property_id.path.required - Property id
 * @param {string} start_time.body.required - Start time
 * @param {string} end_time.body.required - End time
 * @returns {object} 200 - Visit booked successfully
 * @returns {Error}  400 - Start and End times are required, 
 * @return {Error} 400 - Start time must be before end time, 
 * @return {Error} 400 - Times must be in the future,
 * @return {Error} 400 - Visit already booked for this property between start and end times,
 * @return {Error} 400 - Property does not exist,
 * @return {Error} 400 - You cannot book a visit to your own property
 * @returns {Error}  500 - Internal server error
 * 
 */
export const bookVisit = asyncHandler(async (req, res) => {
    try {
        // get user id from token
        // const user_id = req.user.id;
        const user_id = "7680dcf4-0176-48b7-b796-28ad14ceced2";

        const { property_id } = req.params;
        const { start_time, end_time } = req.body;

        // Check if property exists
        const property = await prisma.property.findUnique({ where: { id: property_id } });
        if (!property) {
            return res.status(400).json({ message: "Property does not exist." });
        }

        // check if the property availability status is true
        if (property.availability_status === false) {
            return res.status(400).json({ message: "Property is not available to visit for now." });
        }

        // Check if user is booking a visit to their own property
        if (property.user_id === user_id) {
            return res.status(400).json({ message: "You cannot book a visit to your own property." });
        }

        // Check if start_time and end_time is provided
        if (!start_time || !end_time) {
            return res.status(400).json({ message: "Start and End times are required." });
        }

        // Check if start_time is before end_time
        if (start_time >= end_time) {
            return res.status(400).json({ message: "Start time must be before end time." });
        }

        // Check if start_time and end_time is in the past
        if (start_time < Date.now() || end_time < Date.now()) {
            return res.status(400).json({ message: "Times must be in the future." });
        }

        // Check if the user has already booked a visit to this property
        const existingUserVisit = await prisma.visit.findFirst({
            where: {
                AND: [
                    {
                        user_id
                    },
                    {
                        property_id
                    }
                ]
            }
        });
        if (existingUserVisit) {
            return res.status(400).json({ message: "You have already booked a visit to this property at this time." });
        }

        // Check if any user has already booked a visit to this property between start_time and end_time
        const existingVisit = await prisma.visit.findFirst({
            where: {
                AND: [
                    {
                        property_id
                    },
                    {
                        OR: [
                            {
                                start_time: {
                                    gte: start_time,
                                    lt: end_time
                                }
                            },
                            {
                                end_time: {
                                    gt: start_time,
                                    lte: end_time
                                }
                            }
                        ]
                    }
                ]
            }
        });
        if (existingVisit) {
            return res.status(400).json({ message: "Visit already booked for this property between start and end times." });
        }

        // Create visit if all checks pass
        const visit = await prisma.visit.create({
            data: {
                start_time,
                end_time,
                user_profile: {
                    connect: {
                        id: user_id
                    }
                },
                property: {
                    connect: {
                        id: property_id
                    }
                }
            }
        });

        res.status(200).json({ message: "Visit booked successfully.", visit });
    } catch (error) {
        console.error("Error booking visit:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Cancel a visit to a property
 * 
 * @route DELETE /api/v2/property/cancel-visit/{property_id}
 * @group Property - Operations about property
 * @param {string} property_id.path.required - Property id
 * @returns {object} 200 - Visit cancelled successfully
 * @returns {Error}  400 - Visit does not exist,
 * @returns {Error}  400 - Visit does not belong to you,
 * @returns {Error}  400 - Visit cannot be cancelled,
 * @returns {Error}  400 - Property does not exist,
 * @returns {Error}  400 - Property is not available to visit for now,
 * @returns {Error}  500 - Internal server error
 * 
 */
export const cancelVisit = asyncHandler(async (req, res) => {
    try {
        // get user id from token
        const user_id = req.user.id;

        const { property_id } = req.params;

        // Check if property exists
        const property = await prisma.property.findUnique({ where: { id: property_id } });
        if (!property) {
            return res.status(400).json({ message: "Property does not exist." });
        }

        // Check if visit exists
        const visit = await prisma.visit.findFirst({
            where: {
                AND: [
                    {
                        user_id
                    },
                    {
                        property_id
                    }
                ]
            }
        });
        if (!visit) {
            return res.status(400).json({ message: "Visit does not exist." });
        }

        // Check if visit belongs to the user
        if (visit.user_id !== user_id) {
            return res.status(400).json({ message: "Visit does not belong to you." });
        }

        // Check if visit can be cancelled
        if (visit.start_time < Date.now()) {
            return res.status(400).json({ message: "Visit cannot be cancelled." });
        }

        // Delete visit if all checks pass
        await prisma.visit.delete({
            where: {
                id: visit.id
            }
        });

        res.status(200).json({ message: "Visit cancelled successfully." });
    } catch (error) {
        console.error("Error cancelling visit:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * Get all visits of property for owner
 * 
 * @route GET /api/v2/property/my-visits
 * @group Property - Operations about property
 * @returns {object} 200 - An array of visits
 * @returns {Error}  500 - Internal server error
 * 
 */
export const getVisitsOfMyProperties = asyncHandler(async (req, res) => {
    // Get user id from token
    const id = req.user.id;

    try {
        // Pagination
        const page = parseInt(req.query.page) || 0;
        const conditions = {
            where: {
                property: {
                    user_id: id
                }
            }
        };
        const visits = await paginate('visit', `${api_name}/my-visits`, page, conditions);
        res.status(200).json(visits);
    }
    catch (error) {
        console.error("Error getting visits:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

