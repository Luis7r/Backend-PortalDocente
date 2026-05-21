const express = require('express');
const router = express.Router();
const controller = require('../controllers/docenteController');



/**
 * @swagger
 * /api/docentes:
 *   get:
 *     summary: Obtener todos los docentes
 *     tags: [Docente]
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
router.post('/docentes', controller.createDocente);

/**
 * @swagger
 * /api/docentes/{dni}:
 *   delete:
 *     summary: Eliminar un docente por DNI
 *     tags: [Docente]
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
router.delete('/docentes/:dni', controller.deleteDocente);

module.exports = router;