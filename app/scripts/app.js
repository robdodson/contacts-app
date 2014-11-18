(function(window, document, undefined) {
  'use strict';

  // Install Service Worker
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/worker.js').then(function(reg) {
      console.log('◕‿◕', reg);
    }, function(err) {
      console.log('ಠ_ಠ', err);
    });
  }

  // Select auto-binding template and use as the top level of our app
  var app = document.querySelector('#app');
  app.addEventListener('template-bound', function() {
    var pages = document.querySelector('#pages');
    var infoPage = document.querySelector('info-page');

    // Setup categories
    app.category = 'all';

    // Setup routing
    var DEFAULT_ROUTE = '/contacts/all';

    var contacts = function(category) {
      app.category = category;
      app.$.ajax.go();
      app.heading = category.charAt(0).toUpperCase() + category.slice(1);
      if (app.heading === 'All') {
        app.heading = 'All Contacts';
      }
      // In a non-sample app you probably would want to match the
      // routes to pages in a dictionary and then use valueattr on
      // core-animated-pages to pickout which child matches the current route.
      // To keep this sample easy, we're just manually changing the page number.
      pages.selected = 0;
    };

    var info = function(category, contactId) {
      if (!app.contacts) {
        return app.router.setRoute(DEFAULT_ROUTE);
      }
      infoPage.contactId = contactId;
      pages.selected = 1;
    };

    var add = function() {
      if (!app.contacts) {
        return app.router.setRoute(DEFAULT_ROUTE);
      }
      pages.selected = 2;
    };

    var routes = {
      '/contacts/:category': contacts,
      '/contacts/:category/:id': info,
      '/add': add
    };

    var router = app.router = Router(routes);
    router.configure({html5history: true});
    router.init(DEFAULT_ROUTE);
    // Listen for pages to fire their change-route event
    // Instead of letting them change the route directly,
    // handle the event here and change the route for them
    document.addEventListener('change-route', function(e) {
      if (e.detail) {
        router.setRoute(e.detail);
      }
    });
    // Similar to change-route, listen for when a page wants to go
    // back to the previous state and change the route for them
    document.addEventListener('change-route-back', function() {
      history.back();
    });

    // Handle page transitions
    pages.addEventListener('core-animated-pages-transition-prepare', function() {
      pages.selectedItem.querySelector('.page').willPrepare();
    });

    // Set duration for core-animated-pages transitions
    CoreStyle.g.transitions.duration = '0.2s';

  });

})(window, document);
