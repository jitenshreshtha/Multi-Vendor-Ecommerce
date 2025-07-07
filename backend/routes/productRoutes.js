const express = require('express');
const router = express.Router();
const { addProduct, getVendorProducts, deleteProducts, getAllProducts } = require("../controllers/productController");
const { protect, vendorOnly } = require('../middleware/authMiddleware');


router.post('/', protect, vendorOnly, addProduct);
router.get('/my', protect, vendorOnly, getVendorProducts);
router.delete('/:id', protect, vendorOnly, deleteProducts);
router.get('/public', getAllProducts);


module.exports = router;