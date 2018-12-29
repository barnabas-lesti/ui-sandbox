const { postService } = require('../services');

function posts (router) {
	router.route('/:postGroup')
		.get(async (req, res) => {
			const { postGroup } = req.params;
			const [ postGroupData, posts ] = await Promise.all([
				postService.getPostGroup(postGroup),
				postService.getPosts(postGroup),
			]);

			if (postGroupData !== null && posts !== null) {
				const { content, ...meta } = postGroupData;
				res.render('posts', {
					content,
					meta,
					posts,
				});
			} else {
				res.render('notFound');
			}
		});
	return router;
}

module.exports = posts;

