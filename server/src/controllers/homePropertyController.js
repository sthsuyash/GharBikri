const db = require('../db');

// get any 3 random properties which have status of rent which is not posted by current logged in user
const getPropertyHome = async (req, res) => {
    try {
        const { user_id, listingtype } = req.query;
        let properties;
        if (user_id) {
            properties = await db.query(`
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
                WHERE p_listingtype = $1
                AND user_id != $2
                ORDER BY RANDOM()
                LIMIT 3`
                , [listingtype, user_id]
            );
            res.status(200).json({
                property: properties.rows
            });
        } else {
            properties = await db.query(`
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
                WHERE p_listingtype = $1
                ORDER BY RANDOM()
                LIMIT 3`
                , [listingtype]
            );
            res.status(200).json({
                property: properties.rows
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.log(error);
    }
}

module.exports = {
    getPropertyHome
}