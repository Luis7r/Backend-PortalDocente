const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');
const authorizeRoles = require('../middlewares/roleMiddleware');


/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Curso]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *       - profesor
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/cursos', authorizeRoles(['admin', 'profesor']), controller.getCursos);

module.exports = router;