const db = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')

// post property for sale
exports.postProperty = async (req, res) => {
    try {
        const { property_name, property_description, property_price, property_location, property_type } = req.body;
        const newProperty = await db.query("INSERT INTO properties (property_name, property_description, property_price, property_location, property_type, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [property_name, property_description, property_price, property_location, property_type, req.user]);
        res.json(newProperty.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
