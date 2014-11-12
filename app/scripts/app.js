(function(window, document, undefined) {
  'use strict';

  // Set duration for core-animated-pages transitions
  CoreStyle.g.transitions.duration = '0.2s';

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
    var contactPage = document.querySelector('contact-page');
    var infoPage = document.querySelector('info-page');
    var addPage = document.querySelector('add-page');

    // Setup routing
    var contacts = function() {
      pages.selected = 0;
    };
    var info = function(contactId) {
      infoPage.contactId = contactId;
      pages.selected = 1;
    };
    var add = function() {
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

  });

})(window, document);
