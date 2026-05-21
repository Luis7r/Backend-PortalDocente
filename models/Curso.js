const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Curso', {
        id_curso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre_curso: { type: DataTypes.STRING },
        id_profesor: { type: DataTypes.INTEGER }
    }, { tableName: 'cursos', timestamps: false });
};