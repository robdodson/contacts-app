// Install Service Worker
// navigator.serviceWorker.register('/scripts/worker.js').then(function(reg) {
//   console.log('◕‿◕', reg);
// }, function(err) {
//   console.log('ಠ_ಠ', err);
// });

// Select auto-binding template and use as the top level of our app
document.addEventListener('template-bound', function() {

  var pages = document.querySelector('#pages');

  // Setup routing
  var contacts = function() {
    pages.selected = 0;
  };
  var info = function() {
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

});
