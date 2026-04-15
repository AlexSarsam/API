const express = require('express');
const router = express.Router();
const PlanController = require('../controllers/planController');

// Rutas públicas para planes
router.get('/', PlanController.getAllPlans);
router.get('/:id', PlanController.getPlanById);
router.post('/', PlanController.createPlan);
router.put('/:id', PlanController.updatePlan);
router.delete('/:id', PlanController.deletePlan);

module.exports = router;
