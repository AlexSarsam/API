const bcrypt = require('bcryptjs');
const User = require('../models/User');

class UserController {
  /**
   * Obtener todos los usuarios
   * GET /api/users
   */
  static async getAllUsers(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, parseInt(req.query.limit) || 20);
      const offset = (page - 1) * limit;

      const users = await User.findAll(offset, limit);
      const usersWithoutPassword = users.map(({ password_hash, ...rest }) => rest);
      res.json({ users: usersWithoutPassword, page, limit });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        error: 'Error al obtener usuarios',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Obtener un usuario por ID
   * GET /api/users/:id
   */
  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Eliminar password de la respuesta
      delete user.password_hash;

      res.json({ user });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ 
        error: 'Error al obtener el usuario',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Crear un nuevo usuario (admin)
   * POST /api/users
   */
  static async createUser(req, res) {
    try {
      const { email, password, nombre, apellidos, telefono, fecha_nacimiento } = req.body;

      if (!email || !password || !nombre) {
        return res.status(400).json({ error: 'Email, contraseña y nombre son obligatorios' });
      }

      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Formato de email inválido' });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
      }

      // Verificar si el email ya existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        email,
        password_hash,
        nombre,
        apellidos,
        telefono,
        fecha_nacimiento
      });

      // Eliminar password de la respuesta
      delete newUser.password_hash;
      delete newUser.password;

      res.status(201).json({
        message: 'Usuario creado con éxito',
        user: newUser
      });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({
        error: 'Error al crear el usuario',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Actualizar un usuario por ID
   * PUT /api/users/:id
   */
  static async updateUser(req, res) {
    try {
      const requestingUserId = req.user.id;
      const targetUserId = parseInt(req.params.id);

      // Only allow users to update their own profile, admins (rol=1) can update anyone
      if (requestingUserId !== targetUserId && req.user.rol !== 1) {
        return res.status(403).json({ error: 'No tienes permisos para modificar este usuario' });
      }

      // Prevent non-admins from changing their own role
      if (req.body.id_rol !== undefined && req.user.rol !== 1) {
        return res.status(403).json({ error: 'No puedes cambiar tu propio rol' });
      }

      const userId = req.params.id;

      // Si se envia password, hashearlo
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password_hash = await bcrypt.hash(req.body.password, salt);
        delete req.body.password;
      }

      const updated = await User.update(userId, req.body);

      if (!updated) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Devolver datos reales de la BD
      const user = await User.findById(userId);
      delete user.password_hash;

      res.json({
        message: 'Usuario actualizado con éxito',
        user
      });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ 
        error: 'Error al actualizar el usuario', 
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Eliminar un usuario por ID
   * DELETE /api/users/:id
   */
  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deleted = await User.delete(userId);

      if (!deleted) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ 
        error: 'Error al eliminar el usuario',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }
}

module.exports = UserController;
