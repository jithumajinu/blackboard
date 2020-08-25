import socketIO from 'socket.io';

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