const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || !price || !category || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "All fileds  requied" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
    });
    res.status(201).json({
      success: true,
      message: "Product added succesfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal  server  error!",
      error: error.message,
    });
  }
};

module.exports = { createProduct };
