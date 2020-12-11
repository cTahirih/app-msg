const express = require('express');
const app = express();
const User = require('../models/User');

app.post('/user', (req, res) => {
  const getData = async () => {
    const user = await User.findByPk(req.body.id);

    console.log(user);

    res.json({
      data: {
        user_id: user.dataValues.user_id,
        user_name: user.dataValues.user_name,
        user_lastname: user.dataValues.user_lastname,
        user_email: user.dataValues.user_email,
        user_avatar: user.dataValues.user_avatar
      },
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
