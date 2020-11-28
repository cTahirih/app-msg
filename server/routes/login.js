const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sequelize = require('../database/db');
const app = express();

const getData = async (body) => {
  const [ results ] = await sequelize.query(`select * from user where user_email = "${body.email}"`);
  if (!results || results.length <= 0) return null;

  return {
    user_id: results[0].user_id,
    user_name: results[0].user_name,
    user_lastname: results[0].user_lastname,
    user_email: results[0].user_email,
    user_password: results[0].user_password,
    user_avatar: results[0].user_avatar
  }
};

app.post('/login', (req, resp) => {
  let body = req.body;
  getData(body).then((userDB) => {
    if (!userDB) {
      return resp.status(400).json({
        data: {
          accessToken: null
        },
        errorManager: {
          status: resp.statusCode,
          errorNumber: 2,
          description: 'Usuario o contraseña incorrecto'
        }
      });
    }

    if (!bcrypt.compareSync(
      body.password, userDB.user_password
    )) {
      return resp.status(400).json({
        data: {
          accessToken: null
        },
        errorManager: {
          status: resp.statusCode,
          errorNumber: 3,
          description: 'Usuario o contraseña incorrecto klask'
        }
      });
    } else {
      let token = jwt.sign({
        user: userDB
      }, 'seed');

      resp.json(({
        data: {
          accessToken: token
        },
        errorManager: {
          status: resp.statusCode,
          errorNumber: 0,
          description: ''
        }
      }));
    }
  });
});

module.exports = app;
