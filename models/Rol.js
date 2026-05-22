const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Rol', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING },
        usuario: { type: DataTypes.STRING },
        contrasena: { type: DataTypes.STRING }
    }, { tableName: 'rol', timestamps: false });
};