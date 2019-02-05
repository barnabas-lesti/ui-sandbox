const utils = require('../utils');

const loginPage = app => app.get('/login', (req, res) => {
	res.sendFile(utils.fetchHtml('login'));
});

module.exports = loginPage;
