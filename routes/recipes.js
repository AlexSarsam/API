const express = require('express');
const router = express.Router();
const db = require('../config/database');

// OBTENER todas las recetas
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.execute('SELECT * FROM recetas ORDER BY id_receta DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// OBTENER una receta por id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM recetas WHERE id_receta = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
