'use strict';
/* global Meteor, Accounts */

Meteor.methods({
	'AutoGuestSetAccountPassword': function(password) {
		if (Meteor.isServer) {
			var user = Meteor.user();

			// Only set guest user passwords (this may be a little unsecure)
			if (!user || !user.profile || !user.profile.guest) {
				throw new Meteor.Error('problem-setting-password', 'Problem setting password');
			}

			// Set the password to passed
			Accounts.setPassword(user._id, password, { logout: false });
		}
	}
});
if (Meteor.isServer) {
	Meteor.methods({
		'AutoGuestValidateCreateUser': function(options) {
			// Check if username taken
			if (Meteor.users.findOne({ username: options.username })) {
				throw new Meteor.Error('username-taken', 'Username already registered.');
			}

			// Check if email address taken
			if (options.email) {
				var found = Meteor.users.find({ 'emails.address': options.email });
				if (found.count()) {
					throw new Meteor.Error('email-taken', 'Email already registered.');
				}
			}

			// No problem
			return false;
		},
		'AutoGuestUpdateUser': function(options) {
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

			Meteor.users.update(Meteor.user()._id, { $set: set }, {}, function(error) {
				if (error) {
					throw new Meteor.Error('problem-updating-user', 'Problem updating user');
				}
			});
		}
	});
}
