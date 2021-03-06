require('dotenv').config()
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'the-underground',
    allowedFormats: ['mp3'],
    format: 'mp3',
    resource_type: 'video',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const uploadCloud = multer({ storage: storage })

module.exports = uploadCloud