const path = require('path');
const fs = require('fs');

const config = require('../config');

const common = app => app.get('*', (req, res) => {
	const pagePath = req.path.substring(1);
	if (pagePath === 'favicon.ico') {
		res.status(404).send();
	} else {
		const pagesDir = app.get('views');
		const pageFilePath = `${ path.join(pagesDir, pagePath) }.${ config.VIEW_ENGINE_EXT }`;
		try {
			fs.readFileSync(pageFilePath, 'utf-8');
			res.render(pagePath);
		} catch (error) {
			if (error.code === 'ENOENT') {
				res.render('notFound');
			} else {
				res.render('serverError');
			}
		}
	}
});

module.exports = common;
