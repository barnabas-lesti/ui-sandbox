const { contentService } = require('../services');

function posts (router) {
	router.route('/posts/:postGroup')
		.get(async (req, res, next) => {
			const { postGroup } = req.params;
			const [ postGroupData, posts ] = await Promise.all([
				contentService.getPostGroup(postGroup),
				contentService.getPosts(postGroup),
			]);

			if (postGroupData !== null && posts !== null) {
				res.locals = {
					page: {
						meta: {
							description: postGroupData.description,
							keywords: postGroupData.keywords,
							title: postGroupData.title,
						},
						model: {
							content: postGroupData.content,
							postGroup: postGroupData.postGroup,
							posts,
						},
						template: 'postGroup',
					},
				};
			}
			next();
		});
	return router;
}

module.exports = posts;

