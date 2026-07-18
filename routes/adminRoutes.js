const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/dashboard-stats", protect, admin, getDashboardStats);

module.exports = router;
