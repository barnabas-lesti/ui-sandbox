const { contentService } = require('../services');

function posts (router) {
	router.route('/posts')
		.get(async (req, res) => {
			const [ rootPostsData, postGroups ] = await Promise.all([
				contentService.getRootPostsData(),
				contentService.getPostGroups(),
			]);

			if (rootPostsData !== null && postGroups !== null) {
				res.render('posts', {
					meta: {
						description: rootPostsData.description,
						keywords: rootPostsData.keywords,
						title: rootPostsData.title,
					},
					model: {
						content: rootPostsData.content,
						postGroups,
					},
				});
			} else {
				res.render('notFound');
			}
		});
	return router;
}

module.exports = posts;

