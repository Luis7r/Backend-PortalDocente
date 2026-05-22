const { Curso, Profesor } = require('../models');

exports.getCursos = async (req, res) => {
    try {
        let idProfesor = req.query.id_profesor;
        if (req.user && req.user.role === 'profesor') {
            idProfesor = req.user.id;
        }
        const whereCond = idProfesor ? { id_profesor: idProfesor } : {};
        const cursos = await Curso.findAll({ where: whereCond, include: [Profesor] });
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
};