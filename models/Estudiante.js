const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Estudiante', {
        id_estudiante: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        dni: { type: DataTypes.STRING },
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        id_grado: { type: DataTypes.INTEGER },
        id_apoderado: { type: DataTypes.INTEGER }
    }, { tableName: 'estudiantes', timestamps: false });
};