var exec = require('child-process-promise').exec;

exec('cd AngularAppInContext/server; npm install;')
	.then(function (result) {
		console.log('AngularAppInContext/server NPM Packages Installed.....');
		exec('cd AngularAppInContext/client; npm install;')
		.then(function (cResult) {
			console.log('AngularAppInContext/client NPM Packages Installed.....');
			exec('cd AngularAppInContext/client; bower install;')
			.then(function (bResult) {
				console.log('AngularAppInContext/client Bower Packages Installed.....');
				console.log('AngularAppInContext Installed!');
			})
			.catch(function (err) {
				console.log('error: ', err);
			});
		})
		.catch(function (err) {
			console.log('error: ', err);
		});
	})
	.catch(function (err) {
		console.log('error: ', err);
	});

exec('cd ExpressInContext; npm install;')
	.then(function (result) {
		console.log('ExpressInContext NPM Packages Installed.....');
		console.log('ExpressInContext Installed!');
	})
	.catch(function (err) {
		console.log('error: ', err);
	});

exec('cd HapiInContext; npm install;')
	.then(function (result) {
		console.log('HapiInContext NPM Packages Installed.....');
		exec('cd HapiInContext; bower install;')
		.then(function (cResult) {
			console.log('HapiInContext bower Packages Installed.....');
			console.log('HapiInContext Installed!');
		})
		.catch(function (err) {
			console.log('error: ', err);
		});
	})
	.catch(function (err) {
		console.log('error: ', err);
	});

exec('cd KrakenInContext; npm install;')
	.then(function (result) {
		console.log('KrakenInContext NPM Packages Installed.....');
		exec('cd KrakenInContext; bower install;')
		.then(function (cResult) {
			console.log('KrakenInContext bower Packages Installed.....');
			console.log('KrakenInContext Installed!');
		})
		.catch(function (err) {
			console.log('error: ', err);
		});
	})
	.catch(function (err) {
		console.log('error: ', err);
	});

exec('cd KrakenInContextAngular; npm install;')
	.then(function (result) {
		console.log('KrakenInContextAngular NPM Packages Installed.....');
		exec('cd KrakenInContextAngular; bower install;')
		.then(function (cResult) {
			console.log('KrakenInContextAngular bower Packages Installed.....');
			console.log('KrakenInContextAngular Installed!');
		})
		.catch(function (err) {
			console.log('error: ', err);
		});
	})
	.catch(function (err) {
		console.log('error: ', err);
	});

exec('cd SimpleExpressServer; npm install;')
	.then(function (result) {
		console.log('SimpleExpressServer NPM Packages Installed.....');
		console.log('SimpleExpressServer Installed!');
	})
	.catch(function (err) {
		console.log('error: ', err);
	});