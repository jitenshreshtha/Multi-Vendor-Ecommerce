const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

exports.addProduct = async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;
    try {
        const vendor = await Vendor.findOne({ userId: req.user.id });
        if (!vendor) {
            return res.status(403).json({ message: "Vendor not found" });

        }
        const product = await Product.create({
            vendorId: vendor._id,
            name,
            description,
            price,
            stock,
            category,
            imageUrl
        });
        res.status(201).json({ message: "Product added", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVendorProducts = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ userId: req.user.id });
        const products = await Product.find({ vendorId: vendor._id });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.deleteOne();
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}