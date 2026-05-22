const express = require('express');
const router = express.Router();
const controller = require('../controllers/docenteController');
const authorizeRoles = require('../middlewares/roleMiddleware');



/**
 * @swagger
 * /api/docentes:
 *   get:
 *     summary: Obtener todos los docentes
 *     tags: [Docente]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *       - profesor
 *     responses:
 *       200:
 *         description: Lista de docentes
 */
router.get('/docentes', controller.getDocentes);

/**
 * @swagger
 * /api/docentes:
 *   post:
 *     summary: Crear un nuevo docente
 *     tags: [Docente]
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
 *         description: Docente creado
 */
router.post('/docentes', authorizeRoles(['admin']), controller.createDocente);

/**
 * @swagger
 * /api/docentes/{dni}:
 *   delete:
 *     summary: Eliminar un docente por DNI
 *     tags: [Docente]
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: DNI del docente
 *     responses:
 *       200:
 *         description: Docente eliminado
 */
router.delete('/docentes/:dni', authorizeRoles(['admin']), controller.deleteDocente);

module.exports = router;