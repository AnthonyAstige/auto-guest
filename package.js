'use strict';
/*global Package*/

Package.onUse(function(api) {
	api.versionsFrom('1.0.3.1');
	api.use('standard-app-packages');
	api.use([	'accounts-password',
				'random'
	]);

	api.addFiles('export.js');

	api.addFiles('auto-guest.js');

	api.export('AutoGuest');
});
