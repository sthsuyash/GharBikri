const { Router } = require('express');
const { postProperty } = require('../../controllers/sellController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { propertyValidation } = require('../../validators/propertyValidator');
const router = Router();

// post property
router.post('/', authMiddleware, propertyValidation, postProperty);

module.exports = router;
