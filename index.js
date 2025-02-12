require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const trainRoutes = require('./src/routes/trainRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const userRoutes = require('./src/routes/userRoutes');



const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/trains', trainRoutes);
app.use('/bookings', bookingRoutes);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));