const { Router } = require('express');
const { getBuy, getBuyFilter, getBuyId } = require('../../controllers/buyController');
const router = Router();

// get all properties which have status of buy
router.get('/', getBuy);

// get individual property after clicking on it
router.get('/:id', getBuyId);

// get all properties which have status of buy and filter according to the price range, city, and type
router.get('/filter', getBuyFilter);

module.exports = router;