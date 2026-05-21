const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Grado', {
        id_grado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre_grado: { type: DataTypes.STRING },
        vacantes: { type: DataTypes.INTEGER }
    }, { tableName: 'grados', timestamps: false });
};