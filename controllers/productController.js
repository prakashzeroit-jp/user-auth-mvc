const Product = require("../models/Product");
const upload = require("../middleware/uploadMiddleware").array("images", 5);

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

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate(
      "category",
      "name description",
    );

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name description",
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const uploadProductImages = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Upload Error",
        error: err.message,
      });
    }

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please upload at least one image",
        });
      }

      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

      product.images = [...product.images, ...imageUrls];
      await product.save();

      return res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        data: product,
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
    }
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImages,
};
