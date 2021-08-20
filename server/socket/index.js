const startSocket = io => {
  io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('send-message', (message, room) => {
      if (room === '') {
        socket.broadcast.emit('receive-message', message);
      }
      else {
        socket.to(room).emit('receive-message', message);
      }
    });

    socket.on('join-room', (room, callback) => {
      socket.join(room);
      callback(`Joined ${room}`);
    });

    let counter = 0;
    socket.on('song-started', (room) => {
      setInterval(() => {
        counter++
      }, 100);

    });

    socket.on('user-joined-room', (room) => {
      socket.to(room).emit('time-position', counter * 10);
    })
  });
}

module.exports = startSocket;
