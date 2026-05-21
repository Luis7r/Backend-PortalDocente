require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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

const swaggerSpec = swaggerJsdoc(swaggerOptions);
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
app.use('/api', estudianteRoutes);
app.use('/api', docenteRoutes);
app.use('/api', apoderadoRoutes);
app.use('/api', gradoRoutes);
app.use('/api', authRoutes);
app.use('/api', cursoRoutes);
app.use('/api', horarioRoutes);
app.use('/api', detalleRoutes);

// Iniciar Servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
    });
}).catch(err => console.error('Error de conexión a la BD:', err));