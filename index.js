const express = require('express');
const path = require('path');
require('dotenv').config();

//db config 
const { dbconnection } = require('./database/config');

dbconnection();

//App de express
const app = express();

// Lectura y parseo del body
app.use(express.json());

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis rutas
app.use('/api/login', require('./routes/auths'));



server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor coriendo en puerto', process.env.PORT);
});