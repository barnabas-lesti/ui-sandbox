const path = require('path');

const utils = {
	fetchHtml (fileName) {
		return path.join(__dirname, `../client/html/${ fileName }.html`);
	}
};

module.exports = utils;
