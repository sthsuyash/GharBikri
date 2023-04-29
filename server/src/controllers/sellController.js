const db = require('../db')

// post property for sale
exports.postProperty = async (req, res) => {
    try {
        const {
            p_id,
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
            frontal,
            bath,
            kitchen,
            living
        } = req.body
        console.log(req.body)

        const user = req.user;
        console.log(user);

        const { user_id } = user;

        const newImage = await db.query(
            `INSERT INTO image (
                frontal, 
                bath, 
                kitchen, 
                living
            ) VALUES ($1, $2, $3, $4) RETURNING *`,
            [frontal, bath, kitchen, living]
        );

        const image_id = newImage.rows[0].image_id;

        const newProperty = await db.query(
            "INSERT INTO property (p_id, p_name, p_address_street_num, p_address_street_name, p_address_city, p_address_state, p_description, p_type, p_bed, p_bath, p_area_sq_ft, p_repair_quality, p_year, p_price, p_listingType, p_availability_status, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12, $13, $14, $15, $16, $17) RETURNING *",
            [
                p_id,
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
                user_id,
                image_id
            ]
        );

        const property_id = newProperty.rows[0].property_id;
        console.log(property_id)

        res.status(200).json({
            success: true,
            message: "Property posted successfully",
            property_id: property_id
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}
