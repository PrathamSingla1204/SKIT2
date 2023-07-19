const express = require("express");
const router = express.Router();

const csvController = require("../controllers/csv_Controller");

router.get('/',csvController.home);
router.get('/show',csvController.show);

module.exports = router;