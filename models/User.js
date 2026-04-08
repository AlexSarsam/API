const db = require('../config/database');

class User {
  /**
   * Obtener todos los usuarios
   */
  static async findAll(offset = 0, limit = 20) {
    const [rows] = await db.query('SELECT * FROM usuarios LIMIT ? OFFSET ?', [limit, offset]);
    return rows;
  }

  /**
   * Obtener usuario por ID
   */
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return rows[0];
  }

  /**
   * Obtener usuario por email
   */
  static async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  /**
   * Crear un nuevo usuario
   */
  static async create(userData) {
    const query = `INSERT INTO usuarios 
      (email, password_hash, nombre, apellidos, telefono, fecha_nacimiento, id_rol, estado_cuenta) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
      userData.email,
      userData.password_hash,
      userData.nombre,
      userData.apellidos || null,
      userData.telefono || null,
      userData.fecha_nacimiento || null,
      userData.id_rol || 2, // Por defecto rol 2 (usuario normal)
      userData.estado_cuenta || 'activo'
    ];

    const [result] = await db.query(query, values);
    return { id: result.insertId, ...userData };
  }

  /**
   * Actualizar usuario por ID
   */
  static async update(id, userData) {
    const allowedFields = ['email', 'nombre', 'apellidos', 'telefono', 'fecha_nacimiento', 'id_rol', 'estado_cuenta', 'ultimo_acceso', 'password_hash'];
    const fields = [];
    const values = [];

    for (const field of allowedFields) {
      if (userData[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(userData[field]);
      }
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`;
    const [result] = await db.query(query, values);
    return result.affectedRows > 0;
  }

  /**
   * Actualizar último acceso del usuario
   */
  static async updateLastAccess(id) {
    const [result] = await db.query(
      'UPDATE usuarios SET ultimo_acceso = NOW() WHERE id_usuario = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  /**
   * Eliminar usuario por ID
   */
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = User;
