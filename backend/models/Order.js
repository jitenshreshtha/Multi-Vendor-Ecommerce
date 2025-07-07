const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: "true" },
    orderItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
            name: String,
            quantity: Number,
            price: Number

        }
    ],
    shippingAddress: {
        street: String,
        city: String,
        country: String,
        zip: String
    },
    totalPrice: Number,
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    deliveryStatus: { type: String, enum: ["processing", "shipped", "delivered"], default: "processing" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);