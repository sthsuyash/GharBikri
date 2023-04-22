const { Router } = require('express');
const authorization = require('../middlewares/authMiddleware');
const { getBuy } = require('../controllers/buyController');
const router = Router();

// get user
router.get('/',authorization, getBuy);

module.exports = router;