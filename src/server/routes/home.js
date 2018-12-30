const { contentService } = require('../services');

function home (router) {
	router.route('/')
		.get(async (req, res) => {
			const [ homePageData, postGroups ] = await Promise.all([
				contentService.getHomePageData(),
				contentService.getPostGroups(),
			]);

			if (homePageData !== null) {
				res.render('home', {
					meta: {
						description: homePageData.description,
						keywords: homePageData.keywords,
					},
					model: {
						content: homePageData.content,
						postGroups,
					},
				});
			} else {
				res.render('notFound');
			}
		});
	return router;
}

module.exports = home;

