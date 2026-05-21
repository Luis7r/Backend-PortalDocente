const { Profesor } = require('../models');

exports.getDocentes = async (req, res) => {
    try {
        const profesores = await Profesor.findAll();
        res.json(profesores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDocente = async (req, res) => {
    try {
        const nuevoProfesor = await Profesor.create(req.body);
        res.status(201).json(nuevoProfesor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDocente = async (req, res) => {
    try {
        const eliminados = await Profesor.destroy({ where: { dni: req.params.dni } });
        if (eliminados === 0) return res.status(404).json({ error: 'Docente no encontrado' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};