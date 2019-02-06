const userService = require('../services/userService');

const register = app => app.post('/api/register', async (req, res) => {
	setTimeout(async () => {
		const {
			email,
			password,
		} = req.body;
		try {
			const createdUser = await userService.registerUser(email, password);
			res.json(createdUser);
		} catch (error) {
			res.status(500).json(error);
		}
	}, 1000);
});

module.exports = register;
