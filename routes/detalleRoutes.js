const express = require('express');
const router = express.Router();
const controller = require('../controllers/detalleController');
const authorizeRoles = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/detallecurso:
 *   get:
 *     summary: Obtener el detalle de cursos
 *     tags: [DetalleCurso]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *       - profesor
 *     responses:
 *       200:
 *         description: Detalle de cursos
 */
router.get('/detallecurso', authorizeRoles(['admin', 'profesor']), controller.getDetalleCurso);

/**
 * @swagger
 * /api/detallecurso/{id}:
 *   put:
 *     summary: Actualizar detalle de curso por ID
 *     tags: [DetalleCurso]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *       - profesor
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
router.put('/detallecurso/:id', authorizeRoles(['admin', 'profesor']), controller.updateDetalleCurso);

module.exports = router;