const { Router } = require('express');
const authorization = require('../../middlewares/authMiddleware');
const { getRent, getRentId, getRentFilter } = require('../../controllers/rentController');
const router = Router();

// get user
//router.get('/', authorization, getRent);
router.get('/',getRent);

// get individual property after clicking on it
router.get('/:id',getRentId);

// get all properties which have status of buy and filter according to the price range, city, and type
router.get('/filter', getRentFilter);

module.exports = router;