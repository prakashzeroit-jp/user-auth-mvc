const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || !cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Your  cart  is empty" });
    }
    let totalPrice = 0;
    const orderItems = cart.items.map((item) => {
      const itemPrice = item.product.price;
      totalPrice += itemPrice * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: itemPrice,
      };
    });

    const oreder = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed Successfully",
      data: oreder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal  server  error",
      error: error.message,
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate("orderItems.product", "name images");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not  found" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorised to  view this order",
      });
    }

    res.status(200).json({ success: false, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

module.exports = { placeOrder, getOrderHistory, getOrderDetails };
