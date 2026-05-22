const { Profesor, Rol } = require('../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const usuario = req.body.usuario;
        const contrasena = req.body.contrasena || req.body.clave;
        if (!usuario || !contrasena) {
            return res.status(400).json({ success: false, message: 'Usuario y contraseña son obligatorios' });
        }

        const adminUser = await Rol.findOne({
            where: {
                usuario: usuario,
                contrasena: contrasena
            }
        });

        if (adminUser) {
            const token = jwt.sign({ id: adminUser.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const usuarioSeguro = {
                id: adminUser.id,
                nombre: adminUser.nombre,
                usuario: adminUser.usuario,
                role: 'admin'
            };
            return res.json({ success: true, user: usuarioSeguro, token });
        }

        const profesor = await Profesor.findOne({
            where: {
                usuario: usuario,
                contrasena: contrasena
            }
        });

        if (profesor) {
            const token = jwt.sign({ id: profesor.id_profesor, role: 'profesor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const usuarioSeguro = {
                id_profesor: profesor.id_profesor,
                dni: profesor.dni,
                nombre: profesor.nombre,
                apellido: profesor.apellido,
                profesion: profesor.profesion,
                usuario: profesor.usuario,
                celular: profesor.celular,
                codigo_docente: profesor.codigo_docente,
                num_cursos: profesor.num_cursos,
                role: 'profesor'
            };
            return res.json({ success: true, user: usuarioSeguro, token });
        }

        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
};

exports.protectedRoute = (req, res) => {
    res.json({ message: 'Acceso concedido', user: req.user });
};