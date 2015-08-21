'use strict';
/*global Package*/

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.3');

	api.use([
		'standard-app-packages',
		'accounts-password',
		'random'
	]);

	api.addFiles([
		'export.js',
		'auto-guest.js'
	]);

	api.export('AutoGuest');
});
