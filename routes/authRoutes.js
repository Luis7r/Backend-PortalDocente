const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Token de autenticación
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Ruta protegida que requiere token JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso autorizado
 *       401:
 *         description: No autorizado
 */
router.get('/protected', authenticateToken, controller.protectedRoute);

module.exports = router;