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

    // Setup routing
    var contacts = function() {
      pages.selected = 0;
    };

    var info = function(contactId) {
      if (!app.contacts) {
        return router.setRoute('/');
      }
      infoPage.contactId = contactId;
      pages.selected = 1;
    };

    var add = function() {
      if (!app.contacts) {
        return router.setRoute('/');
      }
      pages.selected = 2;
    };

    var routes = {
      '/': contacts,
      'contacts/:id': info,
      'add': add
    };

    var router = Router(routes);
    router.init('/');

    // Handle page transitions
    pages.addEventListener('core-animated-pages-transition-prepare', function() {
      pages.selectedItem.querySelector('.page').willPrepare();
    });

    // Set duration for core-animated-pages transitions
    CoreStyle.g.transitions.duration = '0.2s';

  });

})(window, document);
