const express = require('express');
const cors = require('cors');
const http = require('http');
const Message = require('./models/Message');

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketIO = require('socket.io');
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 4000;
const sequelize = require('./database/db');

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(require('./routes/index'));

io.on('connection', socket => {
  let nameUser = '';
  socket.on('conectado', (name) => {
    nameUser = name;
    if (Object.keys(name).length !== 0 ) {
      socket.broadcast.emit('mensajes', {name, msg: `ha ingresado a la sala de chat`})
    }
  });

  socket.on('mensaje', (name, msg) => {
    io.emit('mensajes', {name, msg});
  })

  socket.on('disconnect', () => {
    io.emit('mensajes', {server: 'server', msg: `${nameUser.name} ha abandonado la sala`})
  })
});


server.listen(PORT, () => {
  console.log('Escuchando puerto', PORT);
  // connect to db

  sequelize.authenticate()
    .then(() => {
      console.log('Conexión DB exitosa');
    })
    .catch(error => console.log('se ha producido un error', error))
})
