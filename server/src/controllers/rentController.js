const db = require('../db');

// get all properties which have listingtype of rent
// donot get properties posted by current logged in user if any user is logged in
const getRent = async (req, res) => {
    try {
        let user_id = req.user;

        let properties;
        if (user_id) {
            properties = await db.query(
                `SELECT 
                *
                FROM property
                WHERE p_listingtype = 'Rent'
                AND user_id != $1`,
                [user_id]
            );
        }
        else {
            properties = await db.query(
                `SELECT 
                *
                FROM property
                WHERE p_listingtype = 'Rent'`
            );
        }
        res.json({
            property: properties.rows
        });
        console.log(properties.rows);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getRent
}