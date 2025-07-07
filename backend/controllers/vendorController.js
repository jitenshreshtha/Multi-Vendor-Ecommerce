const Vendor = require('../models/Vendor');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.becomeVendor = async (req, res) => {
    const { shopName, shopDescription } = req.body;
    try {
        const existing = await Vendor.findOne({ userId: req.user.id });
        if (existing) {
            return res.status(400).json({ message: "Already registered as vendor" });
        }
        const vendor = await Vendor.create({
            userId: req.user.id,
            shopName,
            shopDescription
        });
        await User.findByIdAndUpdate(req.user.id, { role: "vendor" });

        // Generate a new token with the updated role
        const newToken = jwt.sign(
            { id: req.user.id, role: "vendor" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(201).json({ message: "Vendor Registered", vendor, token: newToken });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.getVendorDashboard = async (req, res) => {
    try {
        console.log('User ID from token:', req.user.id); // Add logging
        console.log('User role from token:', req.user.role); // Add logging
        
        const vendor = await Vendor.findOne({ userId: req.user.id });
        console.log('Found vendor:', vendor); // Add logging
        
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        res.json({ vendor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};