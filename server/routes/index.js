const express = require('express');

const app = express();

app.use(require('./message'));
app.use(require('./login'));
app.use(require('./createUser'));
app.use(require('./getUserByID'));

module.exports = app;
