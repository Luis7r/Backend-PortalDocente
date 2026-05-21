const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Horario', {
        ID_Horario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_profesor: { type: DataTypes.INTEGER },
        IG_Grado: { type: DataTypes.INTEGER },
        ID_Curso: { type: DataTypes.INTEGER },
        Dia: { type: DataTypes.STRING },
        HoraInicio: { type: DataTypes.TIME },
        HoraFin: { type: DataTypes.TIME }
    }, { tableName: 'horarios', timestamps: false });
};