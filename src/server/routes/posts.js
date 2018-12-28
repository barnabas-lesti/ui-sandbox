function home (router) {
	router.route('/:postGroup')
		.get((req, res) => {
			const {
				postGroup,
			} = req.params;

			res.render('posts', {
				model: {
					postGroup,
				},
			});
		});
	return router;
}

module.exports = home;

