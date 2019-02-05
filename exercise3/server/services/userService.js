const dataService = require('./dataService');

class UserService {
	async getUsers () {
		const { users = [] } = await dataService.getStore();
		return users;
	}

	async registerUser (email, password) {
		const newUser = {
			email,
			password,
		};
		const store = await dataService.getStore();
		store.users = store.users || [];
		store.users.push(newUser);
		await dataService.updateStore(store);
		return newUser;
	}
}

const userService = new UserService();
module.exports = userService;
