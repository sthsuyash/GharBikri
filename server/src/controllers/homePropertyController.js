const db = require('../db');

// get any 3 random properties which have status of rent which is not posted by current logged in user
const getRentHome = async (req, res) => {
    try {
        const properties = await db.query(`
        SELECT 
        p_id, 
        p_name, 
        p_address_street_num, 
        p_address_street_name, 
        p_address_city, 
        p_address_state, 
        user_id, 
        p_bed, 
        p_bath, 
        p_area_sq_ft, 
        p_price, 
        p_listingtype, 
        p_frontal_image 
        FROM property
        WHERE p_listingtype = 'Rent'
        ORDER BY RANDOM()
        LIMIT 3`);
        res.status(200).json(
            {
                property: properties.rows
            }
        );
        // console.log(properties.rows)
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.log(error);
    }
}

// get any 3 random properties which have status of buy which is not posted by current logged in user
const getBuyHome = async (req, res) => {
    try {
        const properties = await db.query(`
        SELECT 
        p_id, 
        p_name, 
        p_address_street_num, 
        p_address_street_name, 
        p_address_city, 
        p_address_state, 
        user_id, 
        p_bed, 
        p_bath, 
        p_area_sq_ft, 
        p_price, 
        p_listingtype, 
        p_frontal_image 
        FROM property
        WHERE p_listingtype = 'Buy'
        ORDER BY RANDOM()
        LIMIT 3`
        );
        res.status(200).json(
            {
                property: properties.rows
            }
        );
        // console.log(properties.rows)
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.log(error);
    }
}

module.exports = {
    getRentHome,
    getBuyHome
}