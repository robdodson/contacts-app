// Install Service Worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/scripts/worker.js').then(function(reg) {
    console.log('◕‿◕', reg);
  }, function(err) {
    console.log('ಠ_ಠ', err);
  });
}

// Select auto-binding template and use as the top level of our app
var app = document.querySelector('#app');
app.addEventListener('template-bound', function() {
  var pages = document.querySelector('#pages');

  // Setup routing
  var contacts = function() {
    pages.selected = 0;
  };
  var info = function(contactId) {
    pages.selected = 1;
    // hacky async workaround for when the properties change
    setTimeout(function() {
      pages.selectedItem.querySelector('.page').contactId = contactId;
    }, 0);
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
  pages.addEventListener('core-animated-pages-transition-prepare', function(e) {
    pages.selectedItem.querySelector('.page').willPrepare();
  });

});
