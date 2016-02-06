import loopback from 'loopback'
import boot from 'loopback-boot'

const server = loopback();

server.start = function() {
  // start the web server
  return server.listen(function() {
    server.emit('started');
    var baseUrl = server.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (server.get('loopback-component-explorer')) {
      var explorerPath = server.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(server, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  //if (require.main === module)
	server.start();
});

export default server;
