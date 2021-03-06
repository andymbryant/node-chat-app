const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('newMessage', {
    from: 'Alex',
    text: 'Yo man',
    createdAt: 124
  });

  socket.on('createMessage', (message) => {
    console.log('Create message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

server.listen(port, () => console.log(`Server is running on ${port}`));
