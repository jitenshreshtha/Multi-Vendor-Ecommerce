const Order = require('../models/Order');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

exports.placeOrder = async (req, res) => {
    const { cartItems, shippingAddress } = req.body;
    try {
        const orderItems = await Promise.all(
            cartItems.map(async item => {
                const product = await Product.findById(item.productId);
                const vendor = await Vendor.findById(product.vendorId);
                return {
                    productId: product._id,
                    vendorId: vendor._id,
                    name: product.name,
                    quantity: item.quantity,
                    price: product.price
                };
            })
        );
        const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const newOrder = await Order.create({
            userId: req.user.id,
            orderItems,
            shippingAddress,
            totalPrice: total
        });
        res.status(201).json({ message: "Order placed", order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({orders});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};