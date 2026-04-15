const express = require('express');
const router = express.Router();
const db = require('../config/database');


router.get('/detail/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM ejercicios WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/:muscleName', async (req, res, next) => {
  try {
    const { muscleName } = req.params;
    
    const query = `
      SELECT e.* FROM ejercicios e
      JOIN musculos m ON e.musculo_id = m.id
      WHERE m.nombre_key = ?
    `;

    const [rows] = await db.execute(query, [muscleName.toUpperCase()]);
    res.json(rows);
  } catch (error) {
    next(error); 
  }
});

module.exports = router; 