const { contentService } = require('../services');

function posts (router) {
	router.route('/posts')
		.get(async (req, res, next) => {
			const [ rootPostsData, postGroups ] = await Promise.all([
				contentService.getRootPostsData(),
				contentService.getPostGroups(),
			]);

			if (rootPostsData !== null && postGroups !== null) {
				res.locals = {
					page: {
						meta: {
							description: rootPostsData.description,
							keywords: rootPostsData.keywords,
							title: rootPostsData.title,
						},
						model: {
							content: rootPostsData.content,
							postGroups,
						},
						template: 'posts',
					},
				};
			}
			next();
		});
	return router;
}

module.exports = posts;

