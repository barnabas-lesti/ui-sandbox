const home = require('./home');
const post = require('./post');
const postGroup = require('./postGroup');
const posts = require('./posts');

const routes = [
	home,
	post,
	postGroup,
	posts,
];

module.exports = routes;
