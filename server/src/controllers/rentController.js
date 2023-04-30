// rent controller

const db = require('../db');

// get all properties which have status of rent
const getRent = async (req, res) => {
try {
const properties = await db.query(`SELECT p_id, p_name, p_address_street_num, p_address_street_name, 
p__address_city, p_address_state, p_description, p_type, p_bed, p_bath, p_area_sq_ft, p_repair_quality, 
p_year, p_price, p_listingtype, availability_status FROM property WHERE p_listingtype = 'Rent'`);
res.status(200).json({ property: properties.rows });
} catch (error) {
res.status(500).json({ error:error.message });
}
}

// get all properties which have status of rent and filter according to the price range, city, and type
const getRentFilter = async (req, res) => {
try {
const { price, city, type } = req.query;
const properties = await db.query(`SELECT p_id, p_name, p_address_street_num, p_address_street_name, 
p__address_city, p_address_state, p_description, p_type, p_bed, p_bath, p_area_sq_ft, p_repair_quality,
p_year, p_price, p_listingtype, availability_status FROM property 
WHERE p_listingtype = $1 AND p_price BETWEEN $2 AND $3 AND p__address_city = $4 AND p_type = $5`, ["rent", price[0], price[1], city, type]);
res.status(200).json({ property: properties.rows });
} catch (error) {
res.status(500).json({ error:error.message });
}
}

// get individual property after clicking on it
const getRentId = async (req, res) => {
try {
const { id } = req.params;
const property = await db.query("SELECT p_id, p_name, p_address_street_num, p_address_street_name, p__address_city, p_address_state, user_id,image_id,p_description, p_type, p_bed, p_bath, p_area_sq_ft, p_repair_quality, p_year, p_price, p_listingtype, availability_status FROM property WHERE p_id = $1", [id]);
res.status(200).json({ property: property.rows[0] });
} catch (error) {
res.status(500).json({ error:error.message });
}
}

module.exports = {
getRent,
getRentFilter,
getRentId
}