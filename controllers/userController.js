const bcrypt = require('bcryptjs');
const User = require('../models/User');

class UserController {
  /**
   * Obtener todos los usuarios
   * GET /api/users
   */
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      
      // Eliminar passwords de la respuesta
      const usersWithoutPassword = users.map(user => {
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.json({ users: usersWithoutPassword });
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
      const { email, password, nombre } = req.body;

      // Validar campos requeridos
      if (!email || !password || !nombre) {
        return res.status(400).json({
          error: 'Email, contraseña y nombre son obligatorios'
        });
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
        ...req.body,
        password_hash
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
