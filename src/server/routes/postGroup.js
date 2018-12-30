const { contentService } = require('../services');

function posts (router) {
	router.route('/posts/:postGroup')
		.get(async (req, res) => {
			const { postGroup } = req.params;
			const [ postGroupData, posts ] = await Promise.all([
				contentService.getPostGroup(postGroup),
				contentService.getPosts(postGroup),
			]);

			if (postGroupData !== null && posts !== null) {
				res.render('postGroup', {
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
				});
			} else {
				res.render('notFound');
			}
		});
	return router;
}

module.exports = posts;

