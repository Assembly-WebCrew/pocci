module.exports = () => (req, res, next) => {
	// Check query string for requested site
	// Fallback to default site
	next();
};
