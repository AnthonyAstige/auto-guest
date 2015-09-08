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
 *
 * TODO: Pass real error objects to callbacks
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
	// Check if username taken
	if (Meteor.users.findOne({ username: options.username })) {
		return callback(new Meteor.Error('username-taken', 'Username already registered.'));
	}
	/*
	// Check if email address taken
	// TODO: Make this work
	console.log(options.email);
	if (options.email) {
		//var Users = new Mongo.Collection('users');
		var Users = Meteor.users;
		// TODO: Figure out why isn't working, it's not finding users with the email address
		var found = Users.find({ 'emails.address': options.email });
		console.log(found.count());
		//return callback(new Meteor.Error('email-taken', 'Email address already registered.'));
	}
	*/

	Meteor.call('AutoGuestSetAccountPassword', options.password, function(error) {
		if (error) {
			return callback(true);
		} else {
			Meteor.users.update(userId, { $set: set }, {}, function(error) {
				if (error) {
					return callback(true);
				} else {
					return callback(false);
				}
			});
		}
	});
};
