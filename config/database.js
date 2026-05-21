const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('colegioweb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    logging: false
});

module.exports = sequelize;