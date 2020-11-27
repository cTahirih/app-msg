const express = require('express');
const app = express();
const Message = require('../models/Message');

app.get('/message', (req, res) => {
  const getData = async () => {
    const msgs = await Message.findAll();

    const msgArray = [];
    msgs.map((msg) => {

      if (msg) {
        msgArray.push(msg.dataValues)
      }
    })

    res.json({
      data: msgArray,
      errorManager: {
        status: res.statusCode,
        errorNumber: 0,
        description: 'Respuesta exitosa'
      }
    });
  }

  getData();
});
module.exports = app;
