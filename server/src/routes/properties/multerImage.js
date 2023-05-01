const { Router } = require('express');
const router = Router();

const multipleUploads = require('../../controllers/multerImage')

// upload image
router.post('/', multipleUploads, (req, res) => {
    try {
        const files = req.files;
        if (!files) {
            const error = new Error('Please upload a file');
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send(files);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;

