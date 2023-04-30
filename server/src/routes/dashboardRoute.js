const { Router } = require('express');
const authorization = require('../middlewares/authMiddleware');
const { getUser, editUser, deleteUser, changePassword, getUserProperties, getAllProperties, getProperty } = require('../controllers/dashboardController');
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
router.get('/properties', authorization, getUserProperties);

// get property with matching id
router.get('/:id', getProperty);

// get all properties of all users
router.get('/all-user-properties', getAllProperties);

// export router
module.exports = router;