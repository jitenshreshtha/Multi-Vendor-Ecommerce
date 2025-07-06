const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');



const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('DB connected') })
    .catch((e) => { console.log(e) });



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Workign fine' })
})
app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
})