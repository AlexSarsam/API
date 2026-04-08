const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { generateToken, COOKIE_CONFIG } = require('../middleware/auth');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ============================================
// OAUTH GITHUB
// ============================================

// Ruta para iniciar autenticación con GitHub
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// Callback de GitHub
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login-error', session: false }),
  (req, res) => {
    // req.user ahora es un usuario real de la BD (gracias al passport.js actualizado)
    const token = generateToken({
      id_usuario: req.user.id_usuario,
      email: req.user.email,
      id_rol: req.user.id_rol
    });

    res.cookie('fitmeal_token', token, COOKIE_CONFIG);
    res.redirect(`${FRONTEND_URL}/auth/success?provider=github`);
  }
);

// ============================================
// OAUTH GOOGLE
// ============================================

// Ruta para iniciar autenticación con Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback de Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login-error', session: false }),
  (req, res) => {
    const token = generateToken({
      id_usuario: req.user.id_usuario,
      email: req.user.email,
      id_rol: req.user.id_rol
    });

    res.cookie('fitmeal_token', token, COOKIE_CONFIG);
    res.redirect(`${FRONTEND_URL}/auth/success?provider=google`);
  }
);

// ============================================
// RUTA DE ERROR DE LOGIN OAUTH
// ============================================
router.get('/login-error', (req, res) => {
  res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`);
});


module.exports = router;
