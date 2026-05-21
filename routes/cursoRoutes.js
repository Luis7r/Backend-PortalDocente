const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');


/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Curso]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/cursos', controller.getCursos);

module.exports = router;