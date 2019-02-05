const utils = require('../utils');

const registrationPage = app => app.get('/register', (req, res) => {
	res.sendFile(utils.fetchHtml('registration'));
});

module.exports = registrationPage;
