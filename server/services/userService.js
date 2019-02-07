const ApiError = require('../common/ApiError');
const dataService = require('./dataService');

class UserService {
	constructor () {
		this._Users = dataService.getDb().addCollection('Users', {
			unique: [ 'email' ]
		});
	}

	async loginUser (email, password) {
		try {
			const user = this._Users.findOne({ email });
			if (user !== null && user.password === password) {
				return email;
			} else {
				throw new ApiError(ApiError.AUTHENTICATION_FAILED);
			}
		} catch (error) {
			throw error;
		}
	}

	async registerUser (email, password) {
		try {
			const savedUserDoc = this._Users.insert({
				email,
				password,
			});
			return savedUserDoc;
		} catch (error) {
			if (error.message.indexOf('Duplicate') !== -1) {
				throw new ApiError(ApiError.DUPLICATE_KEY);
			} else {
				throw error;
			}
		}
	}
}

const userService = new UserService();
module.exports = userService;
