const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const UserController = require('../controllers/userController');

// Rutas protegidas para usuarios
router.get('/', verifyToken, UserController.getAllUsers);
router.get('/:id', verifyToken, UserController.getUserById);
router.post('/', verifyToken, requireRole(1), UserController.createUser);
router.put('/:id', verifyToken, UserController.updateUser);
router.delete('/:id', verifyToken, requireRole(1), UserController.deleteUser);

module.exports = router;
