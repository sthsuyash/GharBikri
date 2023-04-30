const db = require('../db');
const bcrypt = require('bcrypt');

// get user with matching id if authorized, if exists in database
exports.getUser = async (req, res) => {
    try {
        const user = await db.query(`SELECT 
        user_id, 
        first_name, 
        last_name, 
        user_email, 
        created_at, 
        updated_at, 
        phone_number, 
        address_city, 
        address_state,
        property_count
        FROM users WHERE user_id = $1`,
            [req.user]);
        res.json(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// edit user with matching id if authorized
exports.editUser = async (req, res) => {
    try {
        const { first_name, last_name, user_email, phone_number, address_city, address_state } = req.body;
        // check if user email is already in use
        const email = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
        if (email.rows[0] && email.rows[0].user_id !== req.user) {
            return res.status(401).json({
                success: false,
                message: "Email already in use",
            })
        }

        const user = await db.query(`UPDATE users 
        SET first_name = $1,
        last_name = $2,
        user_email = $3,
        updated_at = CURRENT_TIMESTAMP,
        phone_number = $4,
        address_city = $5,
        address_state = $6,
        WHERE user_id = $7 RETURNING *`,
            [
                first_name,
                last_name,
                user_email,
                phone_number,
                address_city,
                address_state,
                req.user
            ]
        );

        res.send(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// delete user with matching id if authorized
exports.deleteUser = async (req, res) => {
    try {
        const user = await db.query("DELETE FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// change password if authorized and if the old password is correct
// old password should not be the same as the new password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await db.query("SELECT * FROM users WHERE user_id = $1", [req.user]);
        const validPassword = await bcrypt.compare(oldPassword, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }
        const saltRound = 10;
        const salt = await bcrypt.genSaltSync(saltRound);
        const bcryptPassword = await bcrypt.hash(newPassword, salt);
        const updatedUser = await db.query("UPDATE users SET password = $1 WHERE user_id = $2 RETURNING *", [bcryptPassword, req.user]);
        res.json(updatedUser.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// get all properties of user with matching id from params if authorized
exports.getUserProperties = async (req, res) => {
    try {
        const properties = await db.query(`SELECT
        p_id,
        p_name,
        p_address_street_num,
        p_address_street_name,
        p_address_city,
        p_address_state,
        p_bed,
        p_bath,
        p_area_sq_ft,
        p_price,
        p_listingType,
        property.created_at,
        property.updated_at,
        frontal
        FROM property
        JOIN users
        ON property.user_id = users.user_id
        JOIN image
        ON property.image_id = image.image_id
        WHERE property.user_id = $1`,
            [req.user]
        );
        res.json(properties.rows);
        // console.log(properties.rows);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        // console.log(error);
    }
}


// get property with matching id
exports.getProperty = async (req, res) => {
    try {
        const property = await db.query(`
        SELECT
        p_name,
        p_address_street_num,
        p_address_street_name,
        p_address_city,
        p_address_state,
        p_description,
        p_type,
        p_bed,
        p_bath,
        p_area_sq_ft,
        p_repair_quality,
        p_year,
        p_price,
        p_listingType,
        p_availability_status,
        created_at,
        updated_at,
        frontal,
        kitchen,
        living,
        bath
        FROM property 
        JOIN users 
        ON property.user_id = users.user_id
        JOIN images
        ON property.image_id = image.image_id 
        WHERE property.user_id = $1 AND property.property_id = $2`,
            [req.user, req.params.id]
        );
        res.json(property.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// get properties with matching id for all users
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await db.query(`
        SELECT
        p_name,
        p_address_street_num,
        p_address_street_name,
        p_address_city,
        p_address_state,
        p_description,
        p_type,
        p_bed,
        p_bath,
        p_area_sq_ft,
        p_repair_quality,
        p_year,
        p_price,
        p_listingType,
        p_availability_status,
        created_at,
        updated_at,
        frontal,
        kitchen,
        living,
        bath
        FROM property 
        JOIN users 
        ON property.user_id = users.user_id
        JOIN images
        ON property.image_id = images.image_id 
        WHERE property.property_id = $1`,
            [req.params.id]
        );
        res.json(properties.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}