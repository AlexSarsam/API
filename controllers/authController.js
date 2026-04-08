const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken, COOKIE_CONFIG } = require('../middleware/auth');

class AuthController {
  /**
   * Registro de nuevo usuario
   * POST /auth/register
   */
  static async register(req, res) {
    try {
      const { email, password, nombre, apellidos, telefono, fecha_nacimiento } = req.body;

      // Validar campos requeridos
      if (!email || !password || !nombre) {
        return res.status(400).json({ 
          error: 'Email, contraseña y nombre son obligatorios' 
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ 
          error: 'El email ya está registrado' 
        });
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Crear el usuario
      const newUser = await User.create({
        email,
        password_hash,
        nombre,
        apellidos,
        telefono,
        fecha_nacimiento,
        id_rol: 2, // Usuario normal por defecto
        estado_cuenta: 'activo'
      });

      // Eliminar el hash del password de la respuesta
      delete newUser.password_hash;

      // Generar token JWT
      const token = generateToken({
        id_usuario: newUser.id,
        email: newUser.email,
        id_rol: newUser.id_rol
      });

      // Set httpOnly cookie
      res.cookie('fitmeal_token', token, COOKIE_CONFIG);

      res.status(201).json({
        message: 'Usuario registrado con éxito',
        user: newUser,
        token
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        error: 'Error al registrar usuario',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Login de usuario
   * POST /auth/login
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar campos requeridos
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email y contraseña son obligatorios' 
        });
      }

      // Buscar usuario por email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Actualizar último acceso
      await User.updateLastAccess(user.id_usuario);

      // Generar token JWT
      const token = generateToken({
        id_usuario: user.id_usuario,
        email: user.email,
        id_rol: user.id_rol
      });

      // Eliminar el hash del password de la respuesta
      delete user.password_hash;

      // Set httpOnly cookie
      res.cookie('fitmeal_token', token, COOKIE_CONFIG);

      res.json({
        message: 'Login exitoso',
        user,
        token
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        error: 'Error al iniciar sesión',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Verificar token (ya implementado en routes/auth.js)
   * GET /auth/verify
   */
  static async verifyToken(req, res) {
    // Si llegamos aquí, el token es válido (ya fue verificado por el middleware)
    res.json({ 
      valid: true, 
      user: req.user 
    });
  }
}

module.exports = AuthController;
