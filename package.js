'use strict';
/*global Package*/

Package.describe({
  summary: 'Automatic guest creation',
  version: '0.0.3',
  name:'anthonyastige:auto-guest',
  git:'git@github.com:AnthonyAstige/auto-guest.git'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.3');

	api.use([
		'standard-app-packages',
		'accounts-password',
		'random'
	]);

	api.addFiles(
		['meteor-methods.js']
	);
	api.addFiles(
		[
			'export.js',
			'auto-guest.js'
		],
		'client'
	);

	api.export('AutoGuest', 'client');
});
