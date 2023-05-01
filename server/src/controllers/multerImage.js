const multer = require('multer')

//initializing multer to upload images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/src/assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

const uploadImage = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.log(err.message)
            return res.status(400).json({ error: err.message })
        }
        res.send(req.file)
        console.log(req.file)
    })
}

module.exports = uploadImage;