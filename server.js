require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Portal Docente',
            version: '1.0.0',
            description: 'Documentación de los endpoints del Portal Docente',
        },
        servers: [{ url: `http://localhost:${PORT}`}],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

// ... tu código de SwaggerOptions (se queda igual) ...

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 1. RUTA PÚBLICA PARA SWAGGER (Sin authenticateToken ni filtros)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
const estudianteRoutes = require('./routes/estudianteRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const apoderadoRoutes = require('./routes/apoderadoRoutes');
const gradoRoutes = require('./routes/gradoRoutes');
const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const detalleRoutes = require('./routes/detalleRoutes');

// Endpoints
// Auth es público (login)
app.use('/api', authRoutes); 

// Las demás rutas están protegidas globalmente
app.use('/api', authenticateToken, estudianteRoutes);
app.use('/api', authenticateToken, docenteRoutes);
app.use('/api', authenticateToken, apoderadoRoutes);
app.use('/api', authenticateToken, gradoRoutes);
app.use('/api', authenticateToken, cursoRoutes);
app.use('/api', authenticateToken, horarioRoutes);
app.use('/api', authenticateToken, detalleRoutes);

// Iniciar Servidor ...


// Iniciar Servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
    });
}).catch(err => console.error('Error de conexión a la BD:', err));