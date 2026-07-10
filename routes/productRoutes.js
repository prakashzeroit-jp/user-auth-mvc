const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id",protect,updateProduct);
module.exports = router;
