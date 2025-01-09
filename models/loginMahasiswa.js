const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

const Login = sequelize.define('Login', {
  NIM: {
    type: DataTypes.INTEGER
  },
  password: {
    type: DataTypes.STRING
  }
});

module.exports = Login;