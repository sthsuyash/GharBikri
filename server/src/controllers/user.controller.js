import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

export const bookVisit = asyncHandler(async (req, res) => {
    try {
        // const user_id = req.user.id;
        const user_id = '3e0d7e94-e5bd-41d0-a72f-3dd7df597913';
        const { property_id } = req.params;
        const { start_time, end_time } = req.body;

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

        // Check if start_time and end_time is in the past
        if (start_time > end_time) {
            return res.status(400).json({ message: "Start time must be before end time." });
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

        // Check if property exists
        const property = await prisma.property.findUnique({ where: { id: property_id } });
        if (!property) {
            return res.status(400).json({ message: "Property does not exist." });
        }

        // Check if user is booking a visit to their own property
        if (property.user_id === user_id) {
            return res.status(400).json({ message: "You cannot book a visit to your own property." });
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

