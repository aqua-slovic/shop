const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getCategories,
  getFeaturedProducts
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

module.exports = router;
