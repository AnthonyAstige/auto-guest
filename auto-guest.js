'use strict';
/*global Meteor, AutoGuest, Accounts, Random, Session, Tracker */

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
		var user = Meteor.user();
		// Note: undefined means user collection hasn't yet loaded
		if ((user !== undefined) && !user && !Session.get('AutoGuest.creatingUser')) {
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

/*
 * Like Account.createUser but presumes we start with an existing guest user
 * * Same parameters & callback use
 */
AutoGuest.createUser = function(options, callback) {
	// Check for errors
	Meteor.call('AutoGuestValidateCreateUser', options, function(error) {
		if (error) {
			callback(error);
			return;
		}
		// Update password (do first as checks if user is a guest)
		Meteor.call('AutoGuestSetAccountPassword', options.password, function(error) {
			if (error) {
				callback(error);
				return;
			}
			// Update user data
			Meteor.call('AutoGuestUpdateUser', options, function(error) {
				if (error) {
					callback(error);
					return;
				}
				callback();
			});
		});
	});
};
