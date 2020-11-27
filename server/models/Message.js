const { DataTypes } = require('sequelize');
const sequelize = require('./../database/db');

const Message = sequelize.define('message', {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message_body: DataTypes.STRING,
  message_id_user: DataTypes.INTEGER,
  message_date: DataTypes.DATE

}, {
  tableName: 'message'
});

module.exports = Message;
