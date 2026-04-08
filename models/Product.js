const db = require('../config/database');

class Product {
  /**
   * Obtener todos los productos
   */
  static async findAll(offset = 0, limit = 20) {
    const [rows] = await db.query(`
      SELECT p.*, c.nombre AS categoria_nombre
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return rows;
  }

  /**
   * Obtener producto por ID
   */
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM productos WHERE id_producto = ?',
      [id]
    );
    return rows[0];
  }

  /**
   * Crear un nuevo producto
   */
  static async create(productData) {
    const query = `INSERT INTO productos 
      (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
      productData.nombre_producto || productData.nombre,
      productData.descripcion || null,
      productData.precio,
      productData.stock || 0,
      productData.id_categoria || null,
      productData.imagen_url || null,
      productData.estado || 'disponible'
    ];

    const [result] = await db.query(query, values);
    return { id: result.insertId, ...productData };
  }

  /**
   * Actualizar producto por ID
   */
  static async update(id, productData) {
    const allowedFields = ['nombre_producto', 'descripcion', 'precio', 'stock', 'id_categoria', 'imagen_url', 'estado'];
    const fields = [];
    const values = [];

    // Soportar campo 'nombre' como alias de 'nombre_producto'
    if (productData.nombre && !productData.nombre_producto) {
      productData.nombre_producto = productData.nombre;
    }

    for (const field of allowedFields) {
      if (productData[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(productData[field]);
      }
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE productos SET ${fields.join(', ')} WHERE id_producto = ?`;
    const [result] = await db.query(query, values);
    return result.affectedRows > 0;
  }

  /**
   * Eliminar producto por ID
   */
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM productos WHERE id_producto = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Product;
