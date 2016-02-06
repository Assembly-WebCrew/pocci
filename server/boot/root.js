import path from 'path'

module.exports = (server) => {
	const loopback = server.loopback;

	server.use(loopback.static(path.join(__dirname, '..', '..', 'client')));
	server.use((req, res, next) => {
		if (req.url.startsWith('/api')) return next();
		res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
	});
};
