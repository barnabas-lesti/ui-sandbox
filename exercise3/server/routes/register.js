const userService = require('../services/userService');

const register = app => app.post('/api/register', async (req, res) => {
	const {
		email,
		password,
	} = req.body;
	const createdUser = await userService.registerUser(email, password);
	res.json(createdUser);
});

module.exports = register;
