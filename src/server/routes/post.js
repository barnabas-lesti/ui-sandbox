const { contentService } = require('../services');

function post (router) {
	router.route('/posts/:postGroup/:postId')
		.get(async (req, res, next) => {
			const { postGroup, postId } = req.params;
			const post = await contentService.getPost(postGroup, postId);

			if (post !== null) {
				res.locals = {
					page: {
						meta: {
							description: post.description,
							keywords: post.keywords,
							title: post.title,
						},
						model: {
							content: post.content,
						},
						template: 'post',
					},
				};
			}
			next();
		});
	return router;
}

module.exports = post;

