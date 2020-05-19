const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploader = require('../configs/cloudinary.configs');
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

router.post('/uploadAudio', uploader.single('audioRequest', { resource_type: 'raw' }), (req, res) => res.json(req.file.url))

module.exports = router;