Creates a guest account for non-logged in users

## Installation

Run `AutoGuest.go([callback])` somewhere from the client where it will only be called once.

## Functionality

Whenever the current session has no user, create and log into a guest account.

* New visitors
* When logged out

The optional callback method is called whenever a new guest user is created.
