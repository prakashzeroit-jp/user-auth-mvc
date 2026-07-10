const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock count is   required"],
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
