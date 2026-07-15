const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not  found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [productId],
      });
    } else {
      if (wishlist.products.includes(productId)) {
        return res
          .status(400)
          .json({ success: false, message: "Product already in wishlist" });
      }
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added  to wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "products",
      "name price image stock",
    );

    if (!wishlist) {
      return res.status(200).json({ success: true, data: { products: [] } });
    }

    res.status(200).json({
      success: true,
      count: wishlist.products.length,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist  not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId,
    );
    await wishlist.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Product remove from wishlist",
        data: wishlist,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { addToWishlist, getWishlist ,removeFromWishlist};
