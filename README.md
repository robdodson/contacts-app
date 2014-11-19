# Contacts App

[Live link](http://cds-polymer.appspot.com) (view on phone or with mobile emulation in Chrome)

## What this app is

- A fun proof of concept to see what it's like to build an app with Polymer
- A work in progress (please file bug reports and send pull requests)

## What this app is not

- Polished or bug free. It is totally lacking in the former, and chock full of the latter
- Again, please file bug reports—or even better, submit pull requests ;)
- A perfect implementation of Service Worker ([see this bug](https://code.google.com/p/chromium/issues/detail?id=429972)). You can play with a limited version of the service worker in [the service-worker branch](https://github.com/robdodson/contacts-app/tree/service-worker).

## Getting Started

- git clone https://github.com/robdodson/contacts-app.git
- `cd contacts-app`
- `npm install && bower install`
- `grunt serve`

## Supported actions

- Scroll through a list of contacts
- Click the add button to see a mock 'add contact' page
- Click a contact to see more info
