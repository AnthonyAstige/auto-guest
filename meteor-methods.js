'use strict';
/* global Meteor, Accounts */

Meteor.methods({
	'AutoGuestSetAccountPassword': function(password) {
		if (Meteor.isServer) {
			var user = Meteor.user();

			// Only set guest user passwords (this may be a little unsecure)
			if (!user || !user.profile || !user.profile.guest) {
				return false;
			}

			// Set the password to passed
			Accounts.setPassword(user._id, password, { logout: false });
		}
	}
});
