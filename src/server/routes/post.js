const { postService } = require('../services');

function post (router) {
	router.route('/posts/:postGroup/:postId')
		.get(async (req, res) => {
			const { postGroup, postId } = req.params;
			const post = await postService.getPost(postGroup, postId);

			if (post !== null) {
				res.render('post', {
					meta: {
						description: post.description,
						keywords: post.keywords,
						title: post.title,
					},
					model: {
						content: post.content,
					},
				});
			} else {
				res.render('notFound');
			}
		});
	return router;
}

module.exports = post;

