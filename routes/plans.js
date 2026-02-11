const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const PlanController = require('../controllers/planController');

// Rutas protegidas para planes
router.get('/', verifyToken, PlanController.getAllPlans);
router.get('/:id', verifyToken, PlanController.getPlanById);
router.post('/', verifyToken, requireRole(1), PlanController.createPlan);
router.put('/:id', verifyToken, requireRole(1), PlanController.updatePlan);
router.delete('/:id', verifyToken, requireRole(1), PlanController.deletePlan);

module.exports = router;
