const { Sequelize } = require('sequelize');
const { database } = require('../config/config');

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password, {
    host: database.host,
    dialect: 'mysql',
    define: {
      timestamps: false
    }
  }
);

module.exports = sequelize;
