const express = require('express');
const router = express.Router();
const { createCategory,getCategories,updateCategory} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware'); 

router.post('/', protect,admin, createCategory);
router.get('/',getCategories);
router.put('/:id',protect,updateCategory);

module.exports = router;