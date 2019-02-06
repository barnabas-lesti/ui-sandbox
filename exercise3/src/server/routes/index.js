const login = require('./login');
const notFound = require('./notFound');
const register = require('./register');

const routes = [
	register,
	login,

	notFound,
];

module.exports = routes;
