const express = require('express');
const app = express();
const Message = require('./../models/User');

app.get('/message', (req, res) => {
  const getData = async () => {
    const users = await Message.findAll();
    console.log(users);
  }

  getData();
});
module.exports = app;
