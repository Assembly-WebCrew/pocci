import server from '../server'

function createError(statusCode, message) {
	let error = new Error(message);
	error.statusCode = statusCode;
	return error;
}

module.exports = () => (req, res, next) => {
	const Site = server.models.Site;
	const siteId = req.query.site;
	try {
		if (siteId) { // Check query string for requested site
			Site.findOne({where: {id: siteId}}, (err, site) => {
				if (err) return next(err);
				if (site === null) throw createError(404, 'Requested site was not found.');
				req.site = site;
			});
		} else { // Fallback to default site
			Site.findOne({where: {default: true}}, (err, site) => {
				if (err) return next(err);
				if (site === null) throw createError(500, 'Default site is not configured.');
				req.site = site;
			})
		}
	} catch(err) {
		next(err);
	}
	next();
};
