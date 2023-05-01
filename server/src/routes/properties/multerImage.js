const { Router } = require('express');
const router = Router();

const uploadImage = require('../../controllers/multerImage');

//upload the vehicle image in the post to the server
router.route("/").post(uploadImage);

module.exports = router;
