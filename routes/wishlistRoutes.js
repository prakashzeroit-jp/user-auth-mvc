const express = require("express");
const router = express.Router();

const { addToWishlist } = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addToWishlist);

module.exports = router;
