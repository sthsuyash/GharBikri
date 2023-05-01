const { Router } = require('express');
const authorization = require('../middlewares/authMiddleware');
const {
    getUser,
    editUser,
    deleteUser,
    changePassword,
    getUserProperties,
    getAllProperties,
    getProperty,
    editProperty,
    deleteProperty,
    getPropertiesByType } = require('../controllers/dashboardController');
const router = Router();

// get user
router.get('/', authorization, getUser);

// edit user
router.put('/', authorization, editUser);

// delete user
router.delete('/', authorization, deleteUser);

// change password
// user must enter old password
router.put('/change-password', authorization, changePassword);

// get all properties of user who is logged in 
router.get('/get-user-properties', authorization, getUserProperties);

// get property with matching id
router.get('property/:id', getProperty);

// edit property with matching id
router.put('/property/:id', authorization, editProperty);

// delete property with matching id
router.delete('/property/:id', authorization, deleteProperty);

// export router
module.exports = router;