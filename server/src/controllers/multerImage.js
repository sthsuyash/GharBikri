import multer from 'multer';

//initializing multer to upload images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/propertyImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

export const uploadImage = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.send(req.file)
    })
}