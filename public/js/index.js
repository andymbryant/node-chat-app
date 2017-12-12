var socket = io();
socket.on('connect', () => {
  console.log('Connected to server.')

  socket.emit('createMessage', {
    to: 'Zed',
    text: 'Hey this is Zed'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
})
