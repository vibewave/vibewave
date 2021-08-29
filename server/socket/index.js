const { Socket } = require("socket.io");

let users = [];
// export const trackQueueOrder = {};

const startSocket = (io) => {
  let counter = 0;
  const hardValue = 5;

  io.on('connection', (socket) => {
    console.log(socket.id);

    users.push(socket.id)

    if(users.length === 1) {
      io.emit('isHost');
    }

    socket.on('send-message', (message, room) => {
      if (room === '') {
        socket.broadcast.emit('receive-message', message);
      }
      else {
        socket.to(room).emit('receive-message', message);
      }
    });

    socket.on('song-started', () => {
      counter = 0;
      console.log(`song started by ${socket.id}`)
      const counterInterval = setInterval(() => {
        counter += 100
      }, 100);
      console.log(counter);
    });


    socket.on('join-room', () => {
      // socket.join(room);
      console.log(`${socket.id} joined the room.`);
      console.log(`Counter from server: ${counter}`);
      socket.emit('time-position', counter);
    });

    socket.on('disconnect', ()=> {
      users = users.filter(user => user !== socket.id);
      console.log('users after dc ',users)
    });
  });
}

module.exports = startSocket;
