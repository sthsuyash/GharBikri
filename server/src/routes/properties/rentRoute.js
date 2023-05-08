const { Router } = require('express');
const { getRent } = require('../../controllers/rentController');
const router = Router();

// get user
//router.get('/', authorization, getRent);
router.get('/', getRent);

module.exports = router;