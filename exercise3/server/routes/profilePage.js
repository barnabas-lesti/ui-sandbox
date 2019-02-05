const utils = require('../utils');

const profilePage = app => app.get('/profile', (req, res) => {
	res.sendFile(utils.fetchHtml('profile'));
});

module.exports = profilePage;
