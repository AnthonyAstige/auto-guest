'use strict';
/*global Meteor, AutoGuest, Accounts, Random, Session, Tracker */

if (Meteor.isClient) {
	var	generateUsername = function() {
		var randomDigits = function(n) {
			var digits = '';
			for (var ii = 0; ii < n; ii++) {
				digits += Random.choice('1234567890');
			}
			return digits;
		};
		return 'guest_' + randomDigits(12);
	};

	var generatePassword = function() {
		return Random.id();
	};

	AutoGuest.go = function(cb) {
		Tracker.autorun(function() {
			if (!Meteor.user() && !Session.get('AutoGuest.creatingUser')) {
				Session.set('AutoGuest.creatingUser', true);
				var options = {
					username: generateUsername(),
					password: generatePassword(),
					profile: { guest: true }
				};
				var created = function(err) {
					if (err && (err.reason === 'Username already exists.')) {
						options.username = generateUsername();
						Accounts.createUser(options, created);
						return;
					}
					Meteor.loginWithPassword(options.username, options.password, function() {
						Session.set('AutoGuest.creatingUser', false);
						if (cb) {
							cb();
						}
					});
				};
				Accounts.createUser(options, created);
			}
		});
	};
}
