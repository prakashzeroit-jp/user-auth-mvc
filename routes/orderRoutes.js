const express = require("express");
const router = express.Router();

const { placeOrder,getOrderHistory,getOrderDetails } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post('/', protect, placeOrder);
router.get('/',protect,getOrderHistory);
router.get('/:id',protect,getOrderDetails);

module.exports = router;
