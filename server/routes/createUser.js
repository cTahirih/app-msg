const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

app.post('/register', (req, res) => {

  let body = req.body;

  const user = User.build({
    user_name: body.name,
    user_lastname: body.lastname,
    user_email: body.email,
    user_password: bcrypt.hashSync(body.password, 10), // encriptacion
    user_avatar: body.image
  });

  User.create(user.dataValues)
    .then((e) => {
      res.json({
        data: {
          user: {
            user_id: e.user_id,
            user_name: e.user_name,
            user_lastname: e.user_lastname,
            user_email: e.user_email,
            user_avatar: e.user_avatar,
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
