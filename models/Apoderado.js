const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Apoderado', {
        id_apoderado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        dni: { type: DataTypes.STRING },
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        celular: { type: DataTypes.STRING },
        direccion: { type: DataTypes.STRING }
    }, { tableName: 'apoderados', timestamps: false });
};