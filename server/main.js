const appRootPath = require('app-root-path').path;
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const config = require('./common/config');
const routes = require('./routes');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(appRootPath, './')));

for (const route of routes) {
	route(app);
}

const server = app.listen(config.PORT, () => {
	const { address, port } = server.address();
	console.log(`WEB Server started: ${ address + port }`);
});
