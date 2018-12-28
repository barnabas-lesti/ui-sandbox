const bodyParser = require('body-parser');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const { config, logger } = require('./common');
const routes = require('./routes');

const app = express();
logger.info(`Using config: ${ config.common.ENV }`);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHandlebars({
	defaultLayout: 'default',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layout'),
	partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

// Common middleware setup
app.use('/assets', [
	express.static('assets'),
	express.static('build/assets'),
]);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Loading routes
for (const route of routes) {
	app.use(route(express.Router()));
}

// Starting the server
const server = app.listen(config.common.PORT, () => {
	const { address, port } = server.address();
	logger.info(`Server started: ${ address + port }`);
});

module.exports = app;
