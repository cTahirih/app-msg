const express = require('express');
const app = express();
const Message = require('../models/Message');

app.get('/message', (req, res) => {
  const getData = async () => {
    const msgs = await Message.findAll();

    const msgArray = [];
    msgs.map((msg) => {

      if (msg) {
        msgArray.push(msg.dataValues);
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

app.post('/new-msg', (req, res) => {

  let body = req.body;

  const msg = Message.build({
    message_body: body.msg,
    message_id_user: body.idUser,
    message_date: Date.now()
  });

  Message.create(msg.dataValues)
    .then((e) => {
      res.json({
        data: {
          message: {
            message_id: e.dataValues.message_id,
            message_body: e.dataValues.message_body,
            message_id_user: e.dataValues.message_id_user,
            message_date: e.dataValues.message_date
          }
        },
        errorManager: {
          status: res.statusCode,
          errorNumber: 0,
          description: ''
        }
      });
    })
    .catch(onerror => {
      if (onerror) {
        res.status(400).json({
          data: {},
          errorManager: {
            status: res.statusCode,
            errorNumber: 2,
            description: onerror.message
          }
        })
      }
    });
});
module.exports = app;
