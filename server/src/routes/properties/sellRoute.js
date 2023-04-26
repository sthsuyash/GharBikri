const { Router } = require('express');
const { postProperty } = require('../../controllers/sellController');
const { registerValidation, loginValidation } = require('../../validators/authValidator');
const { validationMiddleware } = require('../../middlewares/validations-middleware');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = Router();

// post property
router.post('/', authMiddleware, postProperty);

module.exports = router;
