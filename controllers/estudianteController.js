const { Estudiante, Grado, Apoderado } = require('../models');

exports.getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({ include: [Grado, Apoderado] });
        const results = estudiantes.map(e => ({
            id_estudiante: e.id_estudiante, dni: e.dni, nombre: e.nombre, apellido: e.apellido,
            grados: e.Grado?.nombre_grado || null, nombreA: e.Apoderado?.nombre || null,
            apellidoA: e.Apoderado?.apellido || null, email: e.Apoderado?.email || null,
            celular: e.Apoderado?.celular || null, direccion: e.Apoderado?.direccion || null
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFiltro = async (req, res) => {
    try {
        const grado = req.query.grado;
        const estudiantes = await Estudiante.findAll({ where: { id_grado: grado }, include: [Grado, Apoderado] });
        const results = estudiantes.map(e => ({
            id_estudiante: e.id_estudiante, dni: e.dni, nombre: e.nombre, apellido: e.apellido,
            grados: e.Grado?.nombre_grado || null, nombreA: e.Apoderado?.nombre || null,
            apellidoA: e.Apoderado?.apellido || null, email: e.Apoderado?.email || null,
            celular: e.Apoderado?.celular || null, direccion: e.Apoderado?.direccion || null
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEstudiante = async (req, res) => {
    try {
        const nuevoEstudiante = await Estudiante.create(req.body);
        res.status(201).json(nuevoEstudiante);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};