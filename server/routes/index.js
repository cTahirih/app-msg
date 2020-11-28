const express = require('express');

const app = express();

app.use(require('./message'));
app.use(require('./login'));
app.use(require('./createUser'));

module.exports = app;
