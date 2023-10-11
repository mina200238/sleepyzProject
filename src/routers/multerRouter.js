const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'upload/',
});

const multerHandler = require('../middlewares/multerHandler');
const uploadToFireStore = require('../middlewares/uploadToFireStore');

router.post('/single', upload.single('image'), multerHandler, uploadToFireStore);

module.exports = router;
