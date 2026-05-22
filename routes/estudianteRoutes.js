const express = require('express');
const router = express.Router();
const controller = require('../controllers/estudianteController');
const authorizeRoles = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 */
router.get('/estudiantes', authorizeRoles(['admin']), controller.getEstudiantes);

/**
 * @swagger
 * /api/filtro:
 *   get:
 *     summary: Obtener estudiantes filtrados
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *     responses:
 *       200:
 *         description: Estudiantes filtrados
 */
router.get('/filtro', authorizeRoles(['admin']), controller.getFiltro);

/**
 * @swagger
 * /api/newestudiantes:
 *   post:
 *     summary: Crear un estudiante
 *     tags: [Estudiante]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Estudiante creado
 */
router.post('/newestudiantes', authorizeRoles(['admin']), controller.createEstudiante);

module.exports = router;