const express = require('express');
const router = express.Router();
const controller = require('../controllers/gradoController');

/**
 * @swagger
 * /api/vacante:
 *   get:
 *     summary: Obtener vacantes por grado
 *     tags: [Grado]
 *     responses:
 *       200:
 *         description: Vacantes obtenidas
 */
router.get('/vacante', controller.getVacantes);

module.exports = router;