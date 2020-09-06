/*
//import socketIO from 'socket.io';
var socketIO = require("socket.io");

const PORT = process.env.PORT;
const io = socketIO(PORT, {
  pingInterval: 10000,
  pingTimeout: 5000
});

io.on('connection', (socket) => {
  console.log(`new client connected ■ socket-id : ${socket.id}`);
  io.emit('join', {message: 'new guy joined'});

  socket.on('draw', (data) => io.emit('draw', data));
});
*/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
  console.log(`new client connected ■ socket-id : ${socket.id}`);
  io.emit('join', {message: 'new guy joined'});

  socket.on('draw', (data) => io.emit('draw', data));
});

http.listen(port, () => console.log('listening on port ' + port));