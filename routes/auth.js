const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const AuthController = require('../controllers/authController');

// ============================================
// AUTENTICACIÓN
// ============================================
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// ============================================
// VERIFICAR TOKEN
// ============================================
router.get('/verify', verifyToken, (req, res) => {
  res.json({
    message: 'Token válido',
    user: req.user
  });
});

module.exports = router;
