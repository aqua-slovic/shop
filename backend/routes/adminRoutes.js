const express = require('express');
const router = express.Router();
const {
  getAdminProducts,
  getAdminProduct,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getDashboardStats,
  getCategoriesWithCounts
} = require('../controllers/adminController');

router.get('/products', getAdminProducts);
router.get('/products/:id', getAdminProduct);
router.post('/products', createAdminProduct);
router.put('/products/:id', updateAdminProduct);
router.delete('/products/:id', deleteAdminProduct);
router.get('/dashboard', getDashboardStats);
router.get('/categories/counts', getCategoriesWithCounts);

module.exports = router;
