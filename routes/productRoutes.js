const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImages
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id",protect,updateProduct);
router.delete("/:id",deleteProduct);
router.post('/:id/upload', protect, uploadProductImages); 
module.exports = router;
