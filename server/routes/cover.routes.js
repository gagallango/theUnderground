const express = require('express');
const router = express.Router();

const uploader = require('../configs/cloudinary.configs');

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




module.exports = router;