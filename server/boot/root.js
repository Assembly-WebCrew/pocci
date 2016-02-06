var path = require('path');

module.exports = function(server) {
	var loopback = server.loopback;

	server.use(loopback.static(path.join(__dirname, '..', '..', 'client')));
	server.use(function(req, res) {
		res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
	});
};
