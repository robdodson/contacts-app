// Install Service Worker
// navigator.serviceWorker.register('/scripts/worker.js').then(function(reg) {
//   console.log('◕‿◕', reg);
// }, function(err) {
//   console.log('ಠ_ಠ', err);
// });

// Select auto-binding template and use as the top level of our app
var app = document.querySelector('#app');
app.addEventListener('template-bound', function(e) {

  console.timeStamp('template bound');

  // Setup routing
  var DEFAULT_ROUTE = 'contacts';
  app.route = this.$.router.route || DEFAULT_ROUTE;

});
