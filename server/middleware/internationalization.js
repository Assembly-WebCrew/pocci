module.exports = () => (req, res, next) => {
	// Check query string for requested language
	// Check user preferences for preferred language
	// Fallback to default language
	next();
};
