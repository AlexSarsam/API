const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { verifyToken, COOKIE_CONFIG } = require('../middleware/auth');
const AuthController = require('../controllers/authController');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Demasiados intentos. Por favor espera 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false
});

router.post('/register', authLimiter, AuthController.register);
router.post('/login', authLimiter, AuthController.login);

router.post('/logout', (req, res) => {
  res.clearCookie('fitmeal_token');
  res.json({ message: 'Sesión cerrada correctamente' });
});

router.get('/verify', verifyToken, (req, res) => {
  res.json({
    message: 'Token válido',
    user: req.user
  });
});

module.exports = router;
