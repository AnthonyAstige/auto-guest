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

/*
 * Like Account.createUser but presumes we start with an existing guest user
 * * Same parameters & callback use
 */
AutoGuest.createUser = function(options, callback) {
	// AutoGuest: Instead of creating a new user, update guest user
	var userId = Meteor.user()._id;
	var set = {
		username: options.username,
		'profile.guest': false
	};
	if (options.email) {
		set.emails = [{
			address: options.email,
			verified: false
		}];
	}
	// TODO: Return object with reason if username or email already taken
	Meteor.call('AutoGuestSetAccountPassword', options.password, function(error) {
		if (error) {
			callback(true);
		} else {
			Meteor.users.update(userId, { $set: set }, {}, function(error) {
				if (error) {
					callback(true);
				} else {
					callback(false);
				}
			});
		}
	});
};
