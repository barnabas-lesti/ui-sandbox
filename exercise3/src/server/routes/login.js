const userService = require('../services/userService');

const login = app => app.post('/api/login', async (req, res) => {
	setTimeout(async () => {
		const {
			email,
			password,
		} = req.body;
		try {
			const token = await userService.loginUser(email, password);
			res.json(token);
		} catch (error) {
			res.status(500).json(error);
		}
	}, 1000);
});

module.exports = login;
