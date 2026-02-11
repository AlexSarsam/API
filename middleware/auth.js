const jwt = require('jsonwebtoken');

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Generar JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id_usuario,
      email: user.email,
      rol: user.id_rol 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expira en 24 horas
  );
};

// Middleware para verificar rol del usuario
// Uso: requireRole(1) para admin, requireRole(1, 3) para admin o premium
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
    }

    next();
  };
};

module.exports = { verifyToken, generateToken, requireRole };
