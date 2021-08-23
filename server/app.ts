const path = require('path');
const express = require('express');
const logger = require('morgan')('dev');
const app = express();
const appDir = require('fs').realpathSync(process.cwd());
import { MiddlewareFn, ErrorRequestHandler } from '../my-types';

//used to allow save variable names for modules

console.log('Project root directory: ', appDir);

// MIDDLEWARES
app.use(logger); // logging
app.use(express.json()); // body-parsing
app.use(express.urlencoded({}));

// STATIC-FILE SERVE
app.use(express.static(path.resolve(appDir, 'assets')));
app.use(express.static(path.resolve(appDir, 'dist')));
app.use(express.static(path.resolve(appDir, 'src')));

// ROUTES
// Add your routes here and uncomment. For example:
app.use('/api', require('./router/api'));
// ...
// */

app.get('/', <MiddlewareFn>function (req, res, next) {
	try {
		res.sendFile(path.join(appDir, 'dist/index.html'));
	} catch (err) {
		next(err);
	}
});

// FALLBACK HANDLER
app.get('*', <MiddlewareFn>function (req, res, next) {
	try {
		res.sendFile(path.resolve(appDir, 'src/fallback.html'));
	} catch (err) {
		next(err);
	}
});

// ERROR HANDLER
app.use(<ErrorRequestHandler>function (err, req, res, next) {
	console.log(err);
	console.log(err.stack);
	res.status(err.status ?? 500).send(err.message ?? 'Internal server error.');
});

module.exports = app;
