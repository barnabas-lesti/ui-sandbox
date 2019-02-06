class ApiError extends Error {
	constructor (type, ...args) {
		super(...args);
		this.type = type;
	}
}

ApiError.DUPLICATE_KEY = 'DUPLICATE_KEY';
ApiError.AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';

module.exports = ApiError;
