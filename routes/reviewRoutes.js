
const express = require('express');
const router = express.Router();

const { addProductReview } = require('../controllers/reviewController');
const { protect }  = require('../middleware/authMiddleware');

router.post('/:id/reviews',protect,addProductReview);

module.exports = router;





