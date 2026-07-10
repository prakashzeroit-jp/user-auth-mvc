const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id",protect,updateProduct);
router.delete("/:id",deleteProduct);
module.exports = router;
