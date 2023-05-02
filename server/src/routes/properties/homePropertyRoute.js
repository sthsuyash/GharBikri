const { Router } = require('express');
// const authMiddleware = require('../../middlewares/authMiddleware');
const { getPropertyHome } = require('../../controllers/homePropertyController');
const router = Router();

router.get('/', getPropertyHome);

module.exports = router;