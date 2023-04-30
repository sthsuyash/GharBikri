const multer = require('multer')

//initializing multer to upload images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const userId = req.params.id;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + userId + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

const multipleUploads = upload.fields([
    { name: 'frontal', maxCount: 1 },
    { name: 'kitchen', maxCount: 1 },
    { name: 'living', maxCount: 1 },
    { name: 'bath', maxCount: 1 }
])

module.exports = multipleUploads;

