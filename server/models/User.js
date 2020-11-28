const { DataTypes } = require('sequelize');
const sequelize = require('./../database/db');

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: DataTypes.STRING,
  user_lastname: DataTypes.STRING,
  user_email: DataTypes.STRING,
  user_password: DataTypes.STRING,
  user_avatar: DataTypes.STRING,
}, {
  tableName: 'user'
});
module.exports = User;
