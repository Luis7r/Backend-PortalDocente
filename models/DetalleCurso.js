const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('DetalleCurso', {
        id_detallecurso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_estudiante: { type: DataTypes.INTEGER },
        id_curso: { type: DataTypes.INTEGER },
        nota1: { type: DataTypes.FLOAT },
        nota2: { type: DataTypes.FLOAT },
        nota3: { type: DataTypes.FLOAT },
        nota4: { type: DataTypes.FLOAT },
        notafinal: { type: DataTypes.FLOAT }
    }, { tableName: 'detallecurso', timestamps: false });
};