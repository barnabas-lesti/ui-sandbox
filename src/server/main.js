const bodyParser = require('body-parser');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const config = require('./common/config');
const logger = require('./common/logger');

const app = express();
logger.info(`Using config: ${ config.common.ENV }`);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHandlebars({
	defaultLayout: 'default',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layout'),
}));
app.set('view engine', 'hbs');

// Setup middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load routes
const routesDir = path.join(__dirname, 'routes');
const files = fs.readdirSync(routesDir);
for (const fileName of files) {
	if (fileName.endsWith('.js') && fileName[0] !== '_') {
		const route = require(path.join(routesDir, fileName));
		app.use('/', route(express.Router()));
	}
}

// Starting the server
const server = app.listen(config.common.PORT, () => {
	const { address, port } = server.address();
	logger.info(`API Server started: ${ address + port }`);
});

module.exports = app;
