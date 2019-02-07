const { contentService } = require('../services');

function home (router) {
	router.route('/')
		.get(async (req, res, next) => {
			const [ homePageData, postGroups ] = await Promise.all([
				contentService.getHomePageData(),
				contentService.getPostGroups(),
			]);

			if (homePageData !== null) {
				res.locals = {
					page: {
						meta: {
							description: homePageData.description,
							keywords: homePageData.keywords,
						},
						model: {
							content: homePageData.content,
							featuredImageUrl: homePageData.featuredImageUrl,
							postGroups,
						},
						template: 'home',
					},
				};
			}
			next();
		});
	return router;
}

module.exports = home;

