const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { bloodGroupDetailsController } = require("../controllers/analyticsController");

const router = express.Router();

// Get blood data records 
router.get('/bloodGroup-data', authMiddleware, bloodGroupDetailsController); 



module.exports = router;
 