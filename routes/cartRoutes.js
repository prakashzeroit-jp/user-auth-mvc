const express =  require('express');
const router = express.Router();
const {addToCart,viewCart,updateQuantity} = require('../controllers/cartController');
const {protect} = require('../middleware/authMiddleware');
const { route } = require('./authRoutes');


router.post('/',protect ,addToCart);
router.get('/',protect,viewCart);
router.put('/',protect,updateQuantity);
module.exports = router;
