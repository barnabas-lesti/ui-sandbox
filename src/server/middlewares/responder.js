const { contentService } = require('../services');

function responder () {
	return async (req, res) => {
		const {
			copyrightText,
			menuItems,
			rootTitle,
			siteLogoUrl,
			social,
		} = await contentService.getSettings();
		const page = res.locals && res.locals.page;

		const global = {
			copyrightText,
			menuItems,
			rootTitle,
			siteLogoUrl,
			social,
		};
		if (page) {
			const { meta, model } = page;
			res.render(page.template, {
				global,
				meta,
				model,
			});
		} else {
			res.render('notFound', {
				global,
			});
		}
	};
}

module.exports = responder;
