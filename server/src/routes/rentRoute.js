const { Router } = require('express');
const authorization = require('../middlewares/authMiddleware');
const { getRent } = require('../controllers/rentController');
const router = Router();

// get user
router.get('/',authorization, getRent);

module.exports = router;