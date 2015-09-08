Creates a guest account for non-logged in users

## Installation

1. Run `meteor add anthonyastige-auto-guest`
2. Add `AutoGuest.go([callback])` to your code to be called once from the client
3. Optional: Override `accounts-ui-unstyled` with `anthonyastige-auto-guest-accounts-ui-unstyled`
 1. `cd ~` (Or wherever you want to put this)
 2. `git clone git@github.com:AnthonyAstige/auto-guest-accounts-ui-unstyled.git`
 3. `cd ~/myProject/packages` (Get into your project's packages folder)
 4. `ln -s ~/auto-guest-accounts-ui-unstyled accounts-ui-unstyled`

## Functionality

Whenever the current session has no user, create and log into a guest account.

* New visitors
* When logged out

The optional callback method is called whenever a new guest user is created.

### anthonyastige-auto-guest-accounts-ui-unstyled

Including this package fixes the standard {{> loginButtons}} so a guest user works more like logged out state.

This package has not been tested to work in all cases like external accounts, etc.  Though it should be fairly easy to modify so it does work if you want to send a pull request.
