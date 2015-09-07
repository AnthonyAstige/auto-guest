Creates a guest account for non-logged in users

## Installation

1. Run `AutoGuest.go([callback])` somewhere from the client where it will only be called once.
2. Add package `anthonyastige-auto-guest-accounts-ui-unstyled` so it overrides `accounts-ui-unstyled`
 1. I have a MeteorPackages folder in my home directory
 2. Then I clone this package to there
 3. Then I create a symlink
 4. DEV TODO: See if I can get the package automatically included in dependencies.

## Functionality

Whenever the current session has no user, create and log into a guest account.

* New visitors
* When logged out

The optional callback method is called whenever a new guest user is created.
