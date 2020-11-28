const express = require('express');
const app = express();
const sequelize = require('./database/db');

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./routes/index'));

app.listen(3000, () => {
  console.log('Escuchando puerto', 3000);
  // connect to db

  sequelize.authenticate()
    .then(() => {
      console.log('Conexión DB exitosa');
    })
    .catch(error => console.log('se ha producido un error', error))
})
