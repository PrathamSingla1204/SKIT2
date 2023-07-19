const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/files' })

const csvController = require("../controllers/csv_Controller");

router.get('/', csvController.home);
router.post('/upload', upload.single('file'), csvController.upload);
router.get('/view/:id', csvController.view);
router.get('/delete/:id', csvController.delete);

module.exports = router;