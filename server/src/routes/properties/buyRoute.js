const { Router } = require('express');
const authorization = require('../../middlewares/authMiddleware');
const { getBuy } = require('../../controllers/buyController');
const router = Router();

// get all properties which have status of buy
router.get('/', getBuy);

module.exports = router;