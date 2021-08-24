const app = require('./app');
const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = process.env.PORT ?? 8086;
const initSocket = require('./socket');
const { db } = require('./db');

const startServer = async () => {
	// START EXPRESS SERVER
	try {
		if (process.env.NODE_ENV === 'production') {
			await db.sync();
		} else {
			await db.sync({ force: true });
		}
		const server = app.listen(PORT, () => {
			console.log(`Express Server listening at http://${HOST}:${PORT}\n...`);
		});

		const io = require('socket.io')(server, {
			cors: {
				origin: ['http://localhost:3032', 'https://admin.socket.io/'],
			},
		});

		initSocket(io);
	} catch (err) {
		console.log(err);
		console.log(err.stack);
	}
};

startServer();
