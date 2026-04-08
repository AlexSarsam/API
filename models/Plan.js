const db = require('../config/database');

class Plan {
  /**
   * Obtener todos los planes
   */
  static async findAll(offset = 0, limit = 20) {
    const [rows] = await db.query('SELECT * FROM planes_suscripcion LIMIT ? OFFSET ?', [limit, offset]);
    return rows;
  }

  /**
   * Obtener plan por ID
   */
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM planes_suscripcion WHERE id_plan = ?',
      [id]
    );
    return rows[0];
  }

  /**
   * Crear un nuevo plan
   */
  static async create(planData) {
    const query = `INSERT INTO planes_suscripcion 
      (nombre_plan, descripcion, precio_mensual, duracion_dias, caracteristicas, estado) 
      VALUES (?, ?, ?, ?, ?, ?)`;
    
    const values = [
      planData.nombre_plan || planData.nombre,
      planData.descripcion || null,
      planData.precio_mensual,
      planData.duracion_dias || 30,
      planData.caracteristicas || null,
      planData.estado || 'activo'
    ];

    const [result] = await db.query(query, values);
    return { id: result.insertId, ...planData };
  }

  /**
   * Actualizar plan por ID
   */
  static async update(id, planData) {
    const allowedFields = ['nombre_plan', 'descripcion', 'precio_mensual', 'duracion_dias', 'caracteristicas', 'estado'];
    const fields = [];
    const values = [];

    // Soportar campo 'nombre' como alias de 'nombre_plan'
    if (planData.nombre && !planData.nombre_plan) {
      planData.nombre_plan = planData.nombre;
    }

    for (const field of allowedFields) {
      if (planData[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(planData[field]);
      }
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE planes_suscripcion SET ${fields.join(', ')} WHERE id_plan = ?`;
    const [result] = await db.query(query, values);
    return result.affectedRows > 0;
  }

  /**
   * Eliminar plan por ID
   */
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM planes_suscripcion WHERE id_plan = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Plan;
