var express = require('express'),
	app = module.exports = express(),
	path = require('path'),
	stat = require('serve-static');

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

app.get('*', function (req, res) {
	res.sendFile(path.resolve(app.get('htmlpath') + '/index.html'));
	//res.json({ htmlPath: htmlPath });
});

if(!module.parent) {
	app.listen(3000);
	console.log('App listening on port 3000!');
}