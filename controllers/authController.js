const { Profesor } = require('../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const usuario = req.body.usuario;
        const contrasena = req.body.contrasena || req.body.clave; 
        if (!usuario || !contrasena) {
            return res.status(400).json({ success: false, message: 'Usuario y contraseña son obligatorios' });
        }
        const user = await Profesor.findOne({ 
            where: { 
                usuario: usuario, 
                contrasena: contrasena 
            } 
        });

        if (user) {
            const token = jwt.sign({ id: user.id_profesor }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const usuarioSeguro = {
                id_profesor: user.id_profesor,
                dni: user.dni,
                nombre: user.nombre,
                apellido: user.apellido,
                profesion: user.profesion,
                usuario: user.usuario,           
                celular: user.celular,           
                codigo_docente: user.codigo_docente, 
                num_cursos: user.num_cursos
            };
            res.json({ success: true, user: usuarioSeguro, token });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error("Error en el login:", error); 
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
};

exports.protectedRoute = (req, res) => {
    res.json({ message: 'Acceso concedido', userId: req.userId });
};