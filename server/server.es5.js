// YOLO Swag bleeding edge
require('babel-polyfill');
require('babel-register')({
	presets: ['es2015', 'stage-0']
});
require('./server');
