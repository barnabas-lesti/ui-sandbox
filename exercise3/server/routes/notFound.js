const utils = require('../utils');

const notFound = app => app.get('*', (req, res) => {
	res.status(404).sendFile(utils.fetchHtml('notFound'));
});

module.exports = notFound;
