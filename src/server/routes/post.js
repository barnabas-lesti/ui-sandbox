const { postService } = require('../services');

function post (router) {
	router.route('/:postGroup/:postId')
		.get(async (req, res) => {
			const { postGroup, postId } = req.params;
			const post = await postService.getPost(postGroup, postId);

			if (post !== null) {
				const { content, ...meta } = post;
				res.render('post', {
					content,
					meta,
				});
			} else {
				res.render('notFound');
			}
		});
	return router;
}

module.exports = post;

