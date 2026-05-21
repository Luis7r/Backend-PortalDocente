const express = require('express');
const router = express.Router();
const controller = require('../controllers/horarioController');

/**
 * @swagger
 * /api/horarios:
 *   get:
 *     summary: Obtener todos los horarios
 *     tags: [Horario]
 *     responses:
 *       200:
 *         description: Lista de horarios
 */
router.get('/horarios', controller.getHorarios);

module.exports = router;