const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../database/db');

class Message extends Model {}
Message.init({
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message_body: DataTypes.STRING,
  message_id_user: DataTypes.INTEGER,
  message_date: DataTypes.DATE

}, {
  sequelize,
  modelName: 'message'
});

module.exports = Message;
