const express = require('express'); // Framework para crear servidores
const mysql = require('mysql2'); // Módulo para conectar a MySQL
const cors = require('cors'); // Middleware para permitir solicitudes CORS
const app = express(); // Crear una instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Definir el puerto del servidor
const jwt = require('jsonwebtoken');
const secretKey = '##LUIS$$';
app.use(cors());
app.use(express.json());

// Conexión a la Base de Datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'colegioweb',
    port: 3307
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// *** RUTAS PARA ESTUDIANTES ***

// Obtener la relación de estudiantes con grados y apoderados
app.get('/api/estudiantes', (req, res) => {
    const query = `
        SELECT e.id_estudiante, e.dni, e.nombre, e.apellido, g.nombre_grado AS grados,
              a.nombre AS nombreA, a.apellido AS apellidoA, a.email, a.celular, a.direccion
        FROM estudiantes e
        JOIN grados g ON e.id_grado = g.id_grado
        LEFT JOIN apoderados a ON e.id_apoderado = a.id_apoderado
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Filtrar estudiantes por grado
app.get('/api/filtro', (req, res) => {
    const grado = req.query.grado; // Obtiene el grado de la consulta
    const query = `
        SELECT e.id_estudiante, e.dni, e.nombre, e.apellido, g.nombre_grado AS grados,
              a.nombre AS nombreA, a.apellido AS apellidoA, a.email, a.celular, a.direccion
        FROM estudiantes e
        JOIN grados g ON e.id_grado = g.id_grado
        LEFT JOIN apoderados a ON e.id_apoderado = a.id_apoderado
        WHERE e.id_grado = ?
    `;
    db.query(query, [grado], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Matricular un nuevo estudiante
app.post('/api/newestudiantes', (req, res) => {
    const { dni, nombre, apellido, id_grado, id_apoderado } = req.body; // Extraer datos del cuerpo de la solicitud
    const sql = 'INSERT INTO estudiantes (dni, nombre, apellido, id_grado, id_apoderado) VALUES (?, ?, ?, ?, ?)';
    const values = [dni, nombre, apellido, id_grado, id_apoderado]; // Valores a insertar

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id_estudiante: result.insertId, dni, nombre, apellido, id_grado, id_apoderado });
    });
});

// *** RUTAS PARA DOCENTES ***




// Obtener la relación de docentes
app.get('/api/docentes', (req, res) => {
    const query = `
        SELECT p.id_profesor, p.dni, p.nombre, p.apellido, p.profesion, p.num_cursos, p.celular, p.codigo_docente, p.usuario, p.contrasena
        FROM profesores p
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Agregar un nuevo docente
app.post('/api/docentes', (req, res) => {
    const { dni, nombre, apellido, profesion, num_cursos, celular, codigo_docente, usuario, contrasena } = req.body;
    const query = `
        INSERT INTO profesores (dni, nombre, apellido, profesion, num_cursos, celular, codigo_docente, usuario, contrasena)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [dni, nombre, apellido, profesion, num_cursos, celular, codigo_docente, usuario, contrasena], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({
            id_profesor: results.insertId,
            dni, nombre, apellido, profesion, num_cursos, celular, codigo_docente, usuario, contrasena
        });
    });
});

// Eliminar un docente por su DNI
app.delete('/api/docentes/:dni', (req, res) => {
    const dni = req.params.dni; // Obtener DNI del parámetro
    const query = 'DELETE FROM profesores WHERE dni = ?';
    db.query(query, [dni], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Docente no encontrado' });
        }
        res.status(204).send(); // Respuesta sin contenido
    });
});

// *** RUTAS PARA APODERADOS ***

// Agregar un nuevo apoderado
app.post('/api/apoderados', (req, res) => {
    const { dni, nombre, apellido, email, celular, direccion } = req.body; // Extraer datos del cuerpo de la solicitud
    const query = `
        INSERT INTO apoderados (dni, nombre, apellido, email, celular, direccion)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [dni, nombre, apellido, email, celular, direccion], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({
            id_apoderado: results.insertId, dni, nombre, apellido, email, celular, direccion
        });
    });
});

// *** RUTAS PARA GRADOS Y VACANTES ***

// Obtener vacantes por grado
app.get('/api/vacante', (req, res) => {
    const grado = req.query.id_grado; // Obtener id_grado de la consulta
    if (!grado) {
        return res.status(400).json({ error: 'El parámetro id_grado es requerido' });
    }

    const query = `
        SELECT g.vacantes
        FROM grados g
        WHERE g.id_grado = ?;
    `;
    db.query(query, [grado], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron vacantes para el grado especificado' });
        }
        res.json(results);
    });
});

// ** RUTAS PARA EL LOGIN **
app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body; //Recuperamos datos del fronted
  const query = 'SELECT * FROM profesores WHERE usuario = ? AND contrasena = ?'; //Consultamos en la bd
  db.query(query, [usuario, contrasena], (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      //Crendenciales correctas
      if (results.length > 0) {
          const userData = results[0];

          // Generar el token JWT
          const token = jwt.sign({ id: userData.id_profesor }, secretKey, { expiresIn: '1h' });

          // Enviar el token y los datos del usuario al frontend
          res.json({ success: true, user: userData, token});

      } else {
          res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
  });
});

//Funcion de autenticación
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


// *** RUTAS PARA CURSOS ***

// Obtener la relación de los cursos junto a los docentes encargados
app.get('/api/cursos', (req, res) => {
    const idProfesor = req.query.id_profesor; // Obtener id_profesor de los parámetros de consulta

    let query = `
        SELECT c.id_curso, c.nombre_curso, c.id_profesor, p.nombre, p.apellido
        FROM cursos c
        JOIN profesores p ON c.id_profesor = p.id_profesor
    `;

    // Filtrar por id_profesor si se proporciona
    if (idProfesor) {
        query += ` WHERE c.id_profesor = ?`;
    }

    db.query(query, [idProfesor], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// obtener horarios DEL PROFESOR
app.get('/api/horarios', (req, res) => {
  const idProfesor = req.query.id_profesor;

  let query = 'SELECT * FROM horarios';

  if (idProfesor) {
    query += ' WHERE horarios.id_profesor = ?';

  }

  db.query(query, [idProfesor], (error, results) => {
    if (error) {
      return res.status(500).json({ error: err });
    }
      res.json(results);
  });
});


// RUTA PARA DETALLECURSO
app.get('/api/detallecurso', (req, res) => {
    const query = `
        SELECT d.id_detallecurso, d.id_estudiante, e.nombre, d.id_curso,
            d.nota1, d.nota2, d.nota3, d.nota4, d.notafinal
        FROM detallecurso AS d
        JOIN estudiantes AS e ON e.id_estudiante = d.id_estudiante
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Actualizar notas del detalle del curso
app.put('/api/detallecurso/:id', (req, res) => {
  const { id } = req.params;
  let { nota1, nota2, nota3, nota4 } = req.body;

  // Validar que las notas sean números
  nota1 = parseFloat(nota1);
  nota2 = parseFloat(nota2);
  nota3 = parseFloat(nota3);
  nota4 = parseFloat(nota4);

  if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
    return res.status(400).json({ error: 'Todas las notas deben ser números' });
  }

  const notafinal = (nota1 + nota2 + nota3 + nota4) / 4;

  const query = `
      UPDATE detallecurso
      SET nota1 = ?, nota2 = ?, nota3 = ?, nota4 = ?, notafinal = ?
      WHERE id_detallecurso = ?
  `;
  db.query(query, [nota1, nota2, nota3, nota4, notafinal, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Notas actualizadas correctamente.' });
  });
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
