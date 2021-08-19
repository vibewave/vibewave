const app = require('./app.js');
const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = process.env.PORT ?? 8085;

const startServer = async () => {
  // START EXPRESS SERVER
  try {
    app.listen(PORT, () => {
      console.log(`Express Server listening at http://${HOST}:${PORT}\n...`);
    });
  }
  catch (err) {
    console.log(err);
    console.log(err.stack);
  }
};

startServer();
