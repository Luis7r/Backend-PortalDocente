const express = require('express');
const router = express.Router();
const controller = require('../controllers/apoderadoController');

/**
 * @swagger
 * /api/apoderados:
 *   post:
 *     summary: Crear un apoderado
 *     tags: [Apoderado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Apoderado creado
 */
router.post('/apoderados', controller.createApoderado);

module.exports = router;