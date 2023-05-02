const { Router } = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const { getRentHome, getBuyHome } = require('../../controllers/homePropertyController');
const router = Router();

// get any 3 random properties which have status of rent which is not posted by current logged in user
router.get('/rent', authMiddleware, getRentHome);

// get any 3 random properties which have status of buy which is not posted by current logged in user
router.get('/buy', authMiddleware, getBuyHome);

module.exports = router;