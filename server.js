const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = '##LUIS$$';

app.use(cors());
app.use(express.json());

// ==========================================
// 1. CONFIGURACIÓN DEL ORM (SEQUELIZE)
// ==========================================
const sequelize = new Sequelize('colegioweb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    logging: false // Cambia a true si deseas ver las consultas SQL en la consola
});

// Probar conexión
sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos MySQL vía Sequelize'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));


// ==========================================
// 2. DEFINICIÓN DE MODELOS
// ==========================================

const Grado = sequelize.define('Grado', {
    id_grado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_grado: { type: DataTypes.STRING },
    vacantes: { type: DataTypes.INTEGER }
}, { tableName: 'grados', timestamps: false });

const Apoderado = sequelize.define('Apoderado', {
    id_apoderado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dni: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    celular: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING }
}, { tableName: 'apoderados', timestamps: false });

const Estudiante = sequelize.define('Estudiante', {
    id_estudiante: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dni: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    id_grado: { type: DataTypes.INTEGER },
    id_apoderado: { type: DataTypes.INTEGER }
}, { tableName: 'estudiantes', timestamps: false });

const Profesor = sequelize.define('Profesor', {
    id_profesor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dni: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    profesion: { type: DataTypes.STRING },
    num_cursos: { type: DataTypes.INTEGER },
    celular: { type: DataTypes.STRING },
    codigo_docente: { type: DataTypes.STRING },
    usuario: { type: DataTypes.STRING },
    contrasena: { type: DataTypes.STRING }
}, { tableName: 'profesores', timestamps: false });

const Curso = sequelize.define('Curso', {
    id_curso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_curso: { type: DataTypes.STRING },
    id_profesor: { type: DataTypes.INTEGER }
}, { tableName: 'cursos', timestamps: false });

const Horario = sequelize.define('Horario', {
    ID_Horario: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    id_profesor: { 
        type: DataTypes.INTEGER 
    },
    IG_Grado: {   // Ojo aquí: lo pongo como 'IG_Grado' porque así está en tu captura
        type: DataTypes.INTEGER 
    },
    ID_Curso: { 
        type: DataTypes.INTEGER 
    },
    Dia: { 
        type: DataTypes.STRING 
    },
    HoraInicio: { 
        type: DataTypes.TIME 
    },
    HoraFin: { 
        type: DataTypes.TIME 
    }
}, { 
    tableName: 'horarios', 
    timestamps: false 
});

const DetalleCurso = sequelize.define('DetalleCurso', {
    id_detallecurso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_estudiante: { type: DataTypes.INTEGER },
    id_curso: { type: DataTypes.INTEGER },
    nota1: { type: DataTypes.FLOAT },
    nota2: { type: DataTypes.FLOAT },
    nota3: { type: DataTypes.FLOAT },
    nota4: { type: DataTypes.FLOAT },
    notafinal: { type: DataTypes.FLOAT }
}, { tableName: 'detallecurso', timestamps: false });

// ==========================================
// 3. ASOCIACIONES (RELACIONES)
// ==========================================
Estudiante.belongsTo(Grado, { foreignKey: 'id_grado' });
Estudiante.belongsTo(Apoderado, { foreignKey: 'id_apoderado' });
Curso.belongsTo(Profesor, { foreignKey: 'id_profesor' });
DetalleCurso.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });
// Horario.belongsTo(Profesor, { foreignKey: 'id_profesor' }); // Descomentar si requieres relaciones extra


// ==========================================
// 4. RUTAS PARA ESTUDIANTES
// ==========================================

app.get('/api/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({
            include: [Grado, Apoderado]
        });
        
        // Mapeamos para enviar exactamente el mismo JSON que antes
        const results = estudiantes.map(e => ({
            id_estudiante: e.id_estudiante,
            dni: e.dni,
            nombre: e.nombre,
            apellido: e.apellido,
            grados: e.Grado?.nombre_grado || null,
            nombreA: e.Apoderado?.nombre || null,
            apellidoA: e.Apoderado?.apellido || null,
            email: e.Apoderado?.email || null,
            celular: e.Apoderado?.celular || null,
            direccion: e.Apoderado?.direccion || null
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/filtro', async (req, res) => {
    try {
        const grado = req.query.grado;
        const estudiantes = await Estudiante.findAll({
            where: { id_grado: grado },
            include: [Grado, Apoderado]
        });

        const results = estudiantes.map(e => ({
            id_estudiante: e.id_estudiante,
            dni: e.dni,
            nombre: e.nombre,
            apellido: e.apellido,
            grados: e.Grado?.nombre_grado || null,
            nombreA: e.Apoderado?.nombre || null,
            apellidoA: e.Apoderado?.apellido || null,
            email: e.Apoderado?.email || null,
            celular: e.Apoderado?.celular || null,
            direccion: e.Apoderado?.direccion || null
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/newestudiantes', async (req, res) => {
    try {
        const nuevoEstudiante = await Estudiante.create(req.body);
        res.status(201).json(nuevoEstudiante);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 5. RUTAS PARA DOCENTES
// ==========================================

app.get('/api/docentes', async (req, res) => {
    try {
        const profesores = await Profesor.findAll();
        res.json(profesores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/docentes', async (req, res) => {
    try {
        const nuevoProfesor = await Profesor.create(req.body);
        res.status(201).json(nuevoProfesor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/docentes/:dni', async (req, res) => {
    try {
        const eliminados = await Profesor.destroy({
            where: { dni: req.params.dni }
        });
        if (eliminados === 0) {
            return res.status(404).json({ error: 'Docente no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 6. RUTAS PARA APODERADOS
// ==========================================

app.post('/api/apoderados', async (req, res) => {
    try {
        const nuevoApoderado = await Apoderado.create(req.body);
        res.status(201).json(nuevoApoderado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 7. RUTAS PARA GRADOS Y VACANTES
// ==========================================

app.get('/api/vacante', async (req, res) => {
    try {
        const grado = req.query.id_grado;
        if (!grado) return res.status(400).json({ error: 'El parámetro id_grado es requerido' });

        const vacantesResult = await Grado.findAll({
            attributes: ['vacantes'],
            where: { id_grado: grado }
        });

        if (vacantesResult.length === 0) {
            return res.status(404).json({ error: 'No se encontraron vacantes para el grado especificado' });
        }
        res.json(vacantesResult);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 8. RUTAS PARA EL LOGIN Y AUTH
// ==========================================

app.post('/api/login', async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;
        const user = await Profesor.findOne({
            where: { usuario, contrasena }
        });

        if (user) {
            const token = jwt.sign({ id: user.id_profesor }, secretKey, { expiresIn: '1h' });
            res.json({ success: true, user, token });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
});

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token no válido' });
        req.userId = decoded.id;
        next();
    });
}

app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso concedido', userId: req.userId });
});

// ==========================================
// 9. RUTAS PARA CURSOS, HORARIOS Y DETALLES
// ==========================================

app.get('/api/cursos', async (req, res) => {
    try {
        const idProfesor = req.query.id_profesor;
        const whereCond = idProfesor ? { id_profesor: idProfesor } : {};

        const cursos = await Curso.findAll({
            where: whereCond,
            include: [Profesor]
        });

        const results = cursos.map(c => ({
            id_curso: c.id_curso,
            nombre_curso: c.nombre_curso,
            id_profesor: c.id_profesor,
            nombre: c.Profesor?.nombre || null,
            apellido: c.Profesor?.apellido || null
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/horarios', async (req, res) => {
    try {
        const idProfesor = req.query.id_profesor;
        const whereCond = idProfesor ? { id_profesor: idProfesor } : {};
        
        const horarios = await Horario.findAll({ where: whereCond });
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/detallecurso', async (req, res) => {
    try {
        const detalles = await DetalleCurso.findAll({
            include: [Estudiante]
        });

        const results = detalles.map(d => ({
            id_detallecurso: d.id_detallecurso,
            id_estudiante: d.id_estudiante,
            nombre: d.Estudiante?.nombre || null,
            id_curso: d.id_curso,
            nota1: d.nota1,
            nota2: d.nota2,
            nota3: d.nota3,
            nota4: d.nota4,
            notafinal: d.notafinal
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/detallecurso/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let { nota1, nota2, nota3, nota4 } = req.body;

        nota1 = parseFloat(nota1);
        nota2 = parseFloat(nota2);
        nota3 = parseFloat(nota3);
        nota4 = parseFloat(nota4);

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
            return res.status(400).json({ error: 'Todas las notas deben ser números' });
        }

        const notafinal = (nota1 + nota2 + nota3 + nota4) / 4;

        await DetalleCurso.update(
            { nota1, nota2, nota3, nota4, notafinal },
            { where: { id_detallecurso: id } }
        );

        res.json({ message: 'Notas actualizadas correctamente.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 10. INICIAR EL SERVIDOR
// ==========================================

// sequelize.sync() asegura que los modelos existan, pero no sobreescribirá tus tablas actuales
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});