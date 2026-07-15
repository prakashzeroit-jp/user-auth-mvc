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

module.exports = { addToWishlist };
