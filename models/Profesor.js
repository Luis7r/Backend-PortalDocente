const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Profesor', {
        id_profesor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        dni: { type: DataTypes.STRING },
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        profesion: { type: DataTypes.STRING },
        num_cursos: { type: DataTypes.INTEGER },
        celular: { type: DataTypes.STRING },
        codigo_docente: { type: DataTypes.STRING },
        usuario: { type: DataTypes.STRING },
        contrasena: { type: DataTypes.STRING }
    }, { tableName: 'profesores', timestamps: false });
};