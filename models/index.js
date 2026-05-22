//une y relaciona todos los modelos
const sequelize = require('../config/database');

const Grado = require('./Grado')(sequelize);
const Apoderado = require('./Apoderado')(sequelize);
const Estudiante = require('./Estudiante')(sequelize);
const Profesor = require('./Profesor')(sequelize);
const Rol = require('./Rol')(sequelize);
const Curso = require('./Curso')(sequelize);
const Horario = require('./Horario')(sequelize);
const DetalleCurso = require('./DetalleCurso')(sequelize);


Estudiante.belongsTo(Grado, { foreignKey: 'id_grado' });
Estudiante.belongsTo(Apoderado, { foreignKey: 'id_apoderado' });
Curso.belongsTo(Profesor, { foreignKey: 'id_profesor' });
DetalleCurso.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });
DetalleCurso.belongsTo(Curso, { foreignKey: 'id_curso' });

module.exports = {
    sequelize,
    Grado,
    Apoderado,
    Estudiante,
    Profesor,
    Rol,
    Curso,
    Horario,
    DetalleCurso
};