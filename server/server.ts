const app = require('./app');
const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = process.env.PORT ?? 8086;
const initSocket = require('./socket');

const startServer = async () => {
  // START EXPRESS SERVER
  try {
    const server = app.listen(PORT, () => {
      console.log(`Express Server listening at http://${HOST}:${PORT}\n...`);
    });

    const io = require('socket.io')(server, {
      cors: {
        origin: [
          'http://localhost:3032',
          'https://admin.socket.io/'
        ]
      }
    });

    initSocket(io);

  }
  catch (err) {
    console.log(err);
    console.log(err.stack);
  }
};

startServer();
