const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require("./routes/vendorRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');



const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('DB connected') })
    .catch((e) => { console.log(e) });



// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Workign fine' })
// })

app.use('/api/auth', authRoutes);
app.use('/api/vendor',vendorRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
})