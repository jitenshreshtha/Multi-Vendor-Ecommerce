const express = require('express');
const router = express.Router();
const {becomeVendor,getVendorDashboard} = require('../controllers/vendorController');
const {protect,vendorOnly} = require("../middleware/authMiddleware");


router.post("/register",protect,becomeVendor);
router.get("/dashboard",protect,vendorOnly,getVendorDashboard);


module.exports = router;