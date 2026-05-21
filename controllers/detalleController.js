const { DetalleCurso, Estudiante } = require('../models');

exports.getDetalleCurso = async (req, res) => {
    try {
        const detalles = await DetalleCurso.findAll({ include: [Estudiante] });
        const results = detalles.map(d => ({
            id_detallecurso: d.id_detallecurso, id_estudiante: d.id_estudiante,
            nombre: d.Estudiante?.nombre || null, id_curso: d.id_curso,
            nota1: d.nota1, nota2: d.nota2, nota3: d.nota3, nota4: d.nota4, notafinal: d.notafinal
        }));
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDetalleCurso = async (req, res) => {
    try {
        const { id } = req.params;
        let { nota1, nota2, nota3, nota4 } = req.body;
        nota1 = parseFloat(nota1); nota2 = parseFloat(nota2);
        nota3 = parseFloat(nota3); nota4 = parseFloat(nota4);

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
            return res.status(400).json({ error: 'Todas las notas deben ser números' });
        }
        const notafinal = (nota1 + nota2 + nota3 + nota4) / 4;
        await DetalleCurso.update({ nota1, nota2, nota3, nota4, notafinal }, { where: { id_detallecurso: id } });
        res.json({ message: 'Notas actualizadas correctamente.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};