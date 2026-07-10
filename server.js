require("dotenv").config();

const express = require("express");
const app = express();
 const connectionDB =  require("./config/db");
const authController = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const mongoose =  require('mongoose');
const PORT = process.env.PORT || 5000;
connectionDB();
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use('/api/auth',authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products',productRoutes); 
app.listen(PORT, () => {
  console.log(`Server  running  at port : ${PORT}`);
});
