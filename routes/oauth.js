const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { generateToken } = require('../middleware/auth');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

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

    res.redirect(`${FRONTEND_URL}/auth/success?token=${encodeURIComponent(token)}&provider=github`);
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

    res.redirect(`${FRONTEND_URL}/auth/success?token=${encodeURIComponent(token)}&provider=google`);
  }
);

// ============================================
// RUTA DE ERROR DE LOGIN OAUTH
// ============================================
router.get('/login-error', (req, res) => {
  res.status(401).json({
    error: 'Error en la autenticación OAuth',
    message: 'No se pudo completar el inicio de sesión'
  });
});

// ============================================
// RUTA DE ÉXITO (TEMPORAL)
// ============================================
router.get('/success', (req, res) => {
  const { token, provider } = req.query;

  // Escapar HTML para prevenir XSS
  const escapeHtml = (str) => {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  };

  const safeProvider = escapeHtml(provider);
  const safeToken = escapeHtml(token);

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Login Exitoso</title>
      <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        .success { color: #28a745; font-size: 24px; }
        .token { background: #f4f4f4; padding: 20px; margin: 20px; word-break: break-all; }
      </style>
    </head>
    <body>
      <div class="success">Login exitoso con ${safeProvider}!</div>
      <p>Tu token de acceso:</p>
      <div class="token">${safeToken}</div>
      <p>Guarda este token para autenticarte en las peticiones API</p>
      <p><small>Usa: Authorization: Bearer ${safeToken}</small></p>
    </body>
    </html>
  `);
});

module.exports = router;
