Creates a guest account for non-logged in users

## Installation

1. Run `meteor add anthonyastige-auto-guest`
2. Add `AutoGuest.go([callback])` to your code to be called once from the client
3. Optional: Cleanup the UI
    1. Option1: Keep normal by simple override of `accounts-ui-unstyled` with `anthonyastige-auto-guest-accounts-ui-unstyled`
     1. `cd ~` (Or wherever you want to put this)
     2. `git clone git@github.com:AnthonyAstige/auto-guest-accounts-ui-unstyled.git`
     3. `cd ~/myProject/packages` (Get into your project's packages folder)
     4. `ln -s ~/auto-guest-accounts-ui-unstyled accounts-ui-unstyled`
    1. Option2: Get twitter bootstrap menu by completely completely replacing `accounts-ui` with bootstrap fork `auto-guest-meteor-accounts-ui-bootstrap-3`
     1. `meteor remove accounts-ui`
     2. `meteor add anthonyastige:auto-guest-meteor-accounts-ui-bootstrap-3`
     3. Follow instructions from [anthonyastige:auto-guest-meteor-accounts-ui-bootstrap-3] ( https://github.com/AnthonyAstige/auto-guest-meteor-accounts-ui-bootstrap-3) (Note: Instructions not updated to new fork name as it's a quick fork)

## Functionality

Whenever the current session has no user, create and log into a guest account.

* New visitors
* When logged out

The optional callback method is called whenever a new guest user is created.

### anthonyastige-auto-guest-accounts-ui-unstyled

Makes {{> loginButtons}} work for guest users (emulates logged out state, updates ratehr than creates, ....)

Since this is over-riding a package and not using the standard versioning system, you'll have to manually update your clone.

This package has not been tested in all cases facebook/google/etc logins, etc.  Though I expect it to be fairly easy to modify and I welcome pull requests.
