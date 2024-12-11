const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        if(!fs.existsSunc(uploadDir)){
            fs.mkdirSync(uploadDir); // if folder doesn't exist, create it
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    },
})

const upload = multer({storage});

const images = [];

router.post('/upload', upload.single('image'), (req, res) => {
    res.json(images);
});

router.get('/images', (req, res) => {
    res.json(images);
});

module.exports = router;