const Product = require('../models/Product');

class ProductController {
  /**
   * Obtener todos los productos
   * GET /api/products
   */
  static async getAllProducts(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, parseInt(req.query.limit) || 20);
      const offset = (page - 1) * limit;

      const products = await Product.findAll(offset, limit);
      res.json({ products, page, limit });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({
        error: 'Error al obtener productos',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Obtener un producto por ID
   * GET /api/products/:id
   */
  static async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json({ product });
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ 
        error: 'Error al obtener el producto',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Crear un nuevo producto
   * POST /api/products
   */
  static async createProduct(req, res) {
    try {
      const { nombre_producto, nombre, precio } = req.body;

      if ((!nombre_producto && !nombre) || precio === undefined) {
        return res.status(400).json({
          error: 'Nombre y precio son obligatorios'
        });
      }

      const newProduct = await Product.create(req.body);

      res.status(201).json({
        message: 'Producto creado con éxito',
        product: newProduct
      });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ 
        error: 'Error al crear el producto', 
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Actualizar un producto por ID
   * PUT /api/products/:id
   */
  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updated = await Product.update(productId, req.body);

      if (!updated) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      const product = await Product.findById(productId);

      res.json({
        message: 'Producto actualizado con éxito',
        product
      });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ 
        error: 'Error al actualizar el producto', 
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Eliminar un producto por ID
   * DELETE /api/products/:id
   */
  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deleted = await Product.delete(productId);

      if (!deleted) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ 
        error: 'Error al eliminar el producto',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }
}

module.exports = ProductController;
