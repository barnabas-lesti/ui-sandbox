const register = require('./register');

const loginPage = require('./loginPage');
const notFound = require('./notFound');
const profilePage = require('./profilePage');
const registrationPage = require('./registrationPage');

const routes = [
	register,

	loginPage,
	profilePage,
	registrationPage,

	notFound,
];

module.exports = routes;
