const { Sequelize } = require('sequelize');

const sequelize = new Sequelize ('webkampus', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize