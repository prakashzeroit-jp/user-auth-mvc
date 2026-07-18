
const express = require('express');
const router = express.Router();

const { addProductReview ,updateProductReview,deleteProductReview} = require('../controllers/reviewController');
const { protect }  = require('../middleware/authMiddleware');

router.post('/:id/reviews',protect,addProductReview);
router.put('/:id/reviews',protect,updateProductReview);
router.delete('/:id/reviews',protect ,deleteProductReview);

module.exports = router;





