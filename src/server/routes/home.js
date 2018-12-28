function home (router) {
	router.route('/')
		.get((req, res) => {
			res.render('home');
		});
	return router;
}

module.exports = home;

