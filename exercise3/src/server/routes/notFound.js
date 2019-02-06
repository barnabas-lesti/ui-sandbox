const appRootPath = require('app-root-path').path;
const path = require('path');

const notFound = app => app.get('*', (req, res) => {
	const notFoundHtmlPath = path.join(appRootPath, `./src/client/notFound.html`);
	res.status(404).sendFile(notFoundHtmlPath);
});

module.exports = notFound;
