const path = require('path');
const express = require('express');
const logger = require('morgan')('dev');
const app = express();
const appDir = require('fs').realpathSync(process.cwd());

console.log('Project root directory: ', appDir);

// MIDDLEWARES
app.use(logger); // logging
app.use(express.json()); // body-parsing
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api', require('./router/api'));
app.use('/auth', require('./router/auth'));
app.use('/youtube', require('./router/youtube'));

app.get('/', async (req, res, next) => {
	try {
		res.sendFile(path.join(appDir, 'dist/index.html'));
	} catch (err) {
		next(err);
	}
});

// STATIC-FILE SERVE
app.use(express.static(path.resolve(appDir, 'assets')));
app.use(express.static(path.resolve(appDir, 'dist')));
app.use(express.static(path.resolve(appDir, 'src')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
	if (path.extname(req.path).length) {
		const err = new Error('Not found');
		err.status = 404;
		next(err);
	} else {
		next();
	}
});

// FALLBACK HANDLER
app.get('*', (req, res) => {
	const indexHtmlPath = path.resolve(appDir, 'dist/index.html');
	if (indexHtmlPath) {
		res.sendFile(indexHtmlPath);
	} else {
		res.send(`<main>Page Not Found</main>`);
	}
});

// ERROR HANDLER
app.use((err, req, res, next) => {
	console.log(err);
	console.log(err.stack);
	res.status(err.status ?? 500).send(err.message ?? 'Internal server error.');
});

module.exports = app;
