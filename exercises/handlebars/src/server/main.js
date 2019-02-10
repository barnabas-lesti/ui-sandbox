const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const setViewEngine = require('./setViewEngine');
const config = require('./config');
const routers = require('./routers');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/client', express.static(path.join(__dirname, '../client')));

setViewEngine(app);

for (const router of routers) {
	router(app);
}

const server = app.listen(config.PORT, () => {
	const { address, port } = server.address();
	console.log(`WEB Server started: ${ address + port }`);
});
