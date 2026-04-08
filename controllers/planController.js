const Plan = require('../models/Plan');

class PlanController {
  /**
   * Obtener todos los planes
   * GET /api/plans
   */
  static async getAllPlans(req, res) {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(100, parseInt(req.query.limit) || 20);
      const offset = (page - 1) * limit;

      const plans = await Plan.findAll(offset, limit);
      res.json({ plans, page, limit });
    } catch (error) {
      console.error('Error al obtener planes:', error);
      res.status(500).json({
        error: 'Error al obtener planes',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Obtener un plan por ID
   * GET /api/plans/:id
   */
  static async getPlanById(req, res) {
    try {
      const planId = req.params.id;
      const plan = await Plan.findById(planId);

      if (!plan) {
        return res.status(404).json({ message: 'Plan no encontrado' });
      }

      res.json({ plan });
    } catch (error) {
      console.error('Error al obtener el plan:', error);
      res.status(500).json({ 
        error: 'Error al obtener el plan',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Crear un nuevo plan
   * POST /api/plans
   */
  static async createPlan(req, res) {
    try {
      const { nombre_plan, nombre, precio_mensual } = req.body;

      if ((!nombre_plan && !nombre) || precio_mensual === undefined) {
        return res.status(400).json({
          error: 'Nombre y precio mensual son obligatorios'
        });
      }

      const newPlan = await Plan.create(req.body);

      res.status(201).json({
        message: 'Plan creado con éxito',
        plan: newPlan
      });
    } catch (error) {
      console.error('Error al crear el plan:', error);
      res.status(500).json({ 
        error: 'Error al crear el plan', 
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Actualizar un plan por ID
   * PUT /api/plans/:id
   */
  static async updatePlan(req, res) {
    try {
      const planId = req.params.id;
      const updated = await Plan.update(planId, req.body);

      if (!updated) {
        return res.status(404).json({ message: 'Plan no encontrado' });
      }

      const plan = await Plan.findById(planId);

      res.json({
        message: 'Plan actualizado con éxito',
        plan
      });
    } catch (error) {
      console.error('Error al actualizar el plan:', error);
      res.status(500).json({ 
        error: 'Error al actualizar el plan', 
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }

  /**
   * Eliminar un plan por ID
   * DELETE /api/plans/:id
   */
  static async deletePlan(req, res) {
    try {
      const planId = req.params.id;
      const deleted = await Plan.delete(planId);

      if (!deleted) {
        return res.status(404).json({ message: 'Plan no encontrado' });
      }

      res.json({ message: 'Plan eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el plan:', error);
      res.status(500).json({ 
        error: 'Error al eliminar el plan',
        ...(process.env.NODE_ENV !== 'production' && { details: error.message })
      });
    }
  }
}

module.exports = PlanController;
