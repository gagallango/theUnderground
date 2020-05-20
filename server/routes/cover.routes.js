const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploader = require('../configs/cloudinary.configs');
const mp3Uploader = require('../configs/cloudinaryAudio.configs');
const ffmpeg = require('ffmpeg')
const uploadLocal = multer({ dest: './public/uploads/' })

router.post('/upload', uploader.single("cover"), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    res.json({ secure_url: req.file.secure_url });
})

router.post('/uploadProfilePic', uploader.single("profilePic"), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    res.json({ secure_url: req.file.secure_url });
})

router.post('/uploadAudio', mp3Uploader.single('audio'), (req, res) => {
    console.log(req.file)
})

module.exports = router;