const bodyParser = require('body-parser');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const { config, logger } = require('./common');
const { responder } = require('./middlewares');
const routes = require('./routes');
const viewHelpers = require('./views/helpers');

const app = express();
logger.info(`Using config: ${ config.common.ENV }`);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHandlebars({
	defaultLayout: 'default',
	extname: '.hbs',
	helpers: viewHelpers,
	layoutsDir: path.join(__dirname, 'views/layout'),
	partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

// Common middleware setup
app.use('/assets', [
	express.static('assets'),
	express.static('build/assets'),
	express.static(`${ config.dataStore.BUCKET_PATH }/assets`),
]);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Loading routes
for (const route of routes) {
	app.use(route(express.Router()));
}

app.use(responder());

// Starting the server
const server = app.listen(config.common.PORT, () => {
	const { address, port } = server.address();
	logger.info(`Server started: ${ address + port }`);
});

module.exports = app;
