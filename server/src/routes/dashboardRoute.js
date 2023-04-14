const { Router } = require('express');
const authorization = require('../middlewares/authMiddleware');
const { getUser, editUser, deleteUser, changePassword, logoutUser } = require('../controllers/dashboardController');
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

// export router
module.exports = router;