const express = require('express');
const router = express.Router();
const controller = require('../controllers/detalleController');

/**
 * @swagger
 * /api/detallecurso:
 *   get:
 *     summary: Obtener el detalle de cursos
 *     tags: [DetalleCurso]
 *     responses:
 *       200:
 *         description: Detalle de cursos
 */
router.get('/detallecurso', controller.getDetalleCurso);

/**
 * @swagger
 * /api/detallecurso/{id}:
 *   put:
 *     summary: Actualizar detalle de curso por ID
 *     tags: [DetalleCurso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Detalle actualizado
 */
router.put('/detallecurso/:id', controller.updateDetalleCurso);

module.exports = router;