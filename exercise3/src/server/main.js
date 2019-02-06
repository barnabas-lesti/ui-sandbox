const appRootPath = require('app-root-path').path;
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use('/', express.static(path.join(appRootPath, './src/client')));
app.use('/assets', express.static(path.join(appRootPath, './src/client/assets')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

for (const route of routes) {
	route(app);
}

const server = app.listen(config.PORT, () => {
	const { address, port } = server.address();
	console.log(`WEB Server started: ${ address + port }`);
});
