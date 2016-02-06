module.exports = (Model, options) => {
	let currentSiteForInstance;

	// TODO: Site selector to API explorer
	Model.beforeRemote('**', (ctx, user, next) => {
		currentSiteForInstance = ctx.req.site;
		next();
	});

	Model.observe('access', (ctx, next) => {
		if (!ctx.query.where) ctx.query.where = {};
		if (!ctx.query.where.siteId) {
			console.log(currentSiteForInstance);
			ctx.query.where.siteId = currentSiteForInstance.id;
		}
		next();
	});
};
