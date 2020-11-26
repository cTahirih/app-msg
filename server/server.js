const express = require('express');
const app = express();
const sequelize = require('./database/db');

app.use(require('./routes/index'));

app.listen(3000, () => {
  console.log('Escuchando puerto', 3000);
  // connect to db

  sequelize.authenticate().then(() => {
    console.log('nos conectamos a la DB');
  }).catch(error => console.log('se ha producido un error', error))
})
