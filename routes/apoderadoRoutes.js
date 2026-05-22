const express = require('express');
const router = express.Router();
const controller = require('../controllers/apoderadoController');
const authorizeRoles = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/apoderados:
 *   post:
 *     summary: Crear un apoderado
 *     tags: [Apoderado]
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
 *         description: Apoderado creado
 */
router.post('/apoderados', authorizeRoles(['admin']), controller.createApoderado);

module.exports = router;