const { Grado } = require('../models');

exports.getVacantes = async (req, res) => {
    try {
        const grado = req.query.id_grado;
        if (!grado) return res.status(400).json({ error: 'El parámetro id_grado es requerido' });
        const vacantesResult = await Grado.findAll({ attributes: ['vacantes'], where: { id_grado: grado } });
        if (vacantesResult.length === 0) return res.status(404).json({ error: 'No se encontraron vacantes' });
        res.json(vacantesResult);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};