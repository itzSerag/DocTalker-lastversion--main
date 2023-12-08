const express = require('express');
const  uploadController  = require('../controllers/uploadController');
const processController = require('../controllers/processController');
const { upload } = require('../utils/uploadFile');

const router = express.Router();


router.post("/upload",upload.single("file"),uploadController.handler)
router.post("/process" , processController.handler)

module.exports = router;