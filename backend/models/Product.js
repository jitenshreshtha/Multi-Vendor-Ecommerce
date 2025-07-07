const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: String,
    imageUrl: String,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
