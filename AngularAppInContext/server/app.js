var express = require('express'),
	app = module.exports = express(),
	path = require('path'),
	paypal = require('paypal-rest-sdk'),
	stat = require('serve-static'),
	ppconfig = require('../../data/config'),
	bodyParser = require('body-parser'),
	router = require('./router');

var data = require(path.resolve(__dirname, 'development.json'));
	console.log('data', data);
	var stats = data.static;
	stats.forEach(function (pair) {
		console.log('loading static content', pair);
		var htmlpath = path.resolve(__dirname + pair.dir),
			dirMiddleware = stat(htmlpath);
		if(pair.path){
			app.use(pair.path, dirMiddleware);
		} else {
			app.set('htmlpath', htmlpath);
			app.use(dirMiddleware);
		}
	});
	
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	app.use(router);

	paypal.configure({
	    'mode': 'sandbox', //sandbox or live
	    'client_id': ppconfig.client_id,
	    'client_secret': ppconfig.client_secret,
	    'grant_type': 'client_credentials',
	    'content_type': 'application/x-www-form-urlencoded'
	});

if(!module.parent) {
	app.listen(3000);
	console.log('App listening on port 3000!');
}