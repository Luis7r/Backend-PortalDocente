const express = require('express');
const router = express.Router();
const controller = require('../controllers/estudianteController');

/**
 * @swagger
 * /api/estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiante]
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 */
router.get('/estudiantes', controller.getEstudiantes);

/**
 * @swagger
 * /api/filtro:
 *   get:
 *     summary: Obtener estudiantes filtrados
 *     tags: [Estudiante]
 *     responses:
 *       200:
 *         description: Estudiantes filtrados
 */
router.get('/filtro', controller.getFiltro);

/**
 * @swagger
 * /api/newestudiantes:
 *   post:
 *     summary: Crear un estudiante
 *     tags: [Estudiante]
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
router.post('/newestudiantes', controller.createEstudiante);

module.exports = router;