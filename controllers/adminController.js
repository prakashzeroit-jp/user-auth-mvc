const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({});

    const orders = await Order.find({ status: { $ne: "Cancelled" } });
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        totalUsers,
        totalProducts,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

module.exports = { getDashboardStats };

