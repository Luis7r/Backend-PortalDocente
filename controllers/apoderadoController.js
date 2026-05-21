const { Apoderado } = require('../models');

exports.createApoderado = async (req, res) => {
    try {
        const nuevoApoderado = await Apoderado.create(req.body);
        res.status(201).json(nuevoApoderado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};