const { Horario } = require('../models');

exports.getHorarios = async (req, res) => {
    try {
        const idProfesor = req.query.id_profesor;
        const whereCond = idProfesor ? { id_profesor: idProfesor } : {};
        const horarios = await Horario.findAll({ where: whereCond });
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};