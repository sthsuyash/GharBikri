// buy controller

// const { Property } = require('../models/Property');

// get all properties which have status of buy
const getBuy = async (req, res) => {
    try {
        // const properties = await Property.find({ status: 'buy' });
        // res.status(200).json({ properties });
        console.log('getBuy');
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getBuy
}


