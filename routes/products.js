const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const ProductController = require('../controllers/productController');

// GET público (no requiere login)
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', verifyToken, requireRole(1), ProductController.createProduct);
router.put('/:id', verifyToken, requireRole(1), ProductController.updateProduct);
router.delete('/:id', verifyToken, requireRole(1), ProductController.deleteProduct);

module.exports = router;
