function home (router) {
	router.route('/:postGroup/:postId')
		.get((req, res) => {
			const {
				postGroup,
				postId,
			} = req.params;

			res.render('post', {
				model: {
					postGroup,
					postId,
				},
			});
		});
	return router;
}

module.exports = home;

