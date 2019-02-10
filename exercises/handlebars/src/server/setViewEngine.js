const expressHandlebars = require('express-handlebars');
const path = require('path');

const config = require('./config');

const setViewEngine = app => {
	app.set('views', path.join(__dirname, './views/pages'))
	app.engine(config.VIEW_ENGINE_EXT, expressHandlebars({
		extname: `.${ config.VIEW_ENGINE_EXT }`,
		defaultLayout: 'default',
		layoutsDir: path.join(__dirname, './views/layouts'),
		partialsDir: path.join(__dirname, './views/partials'),
	}));
	app.set('view engine', config.VIEW_ENGINE_EXT);
};

module.exports = setViewEngine;
