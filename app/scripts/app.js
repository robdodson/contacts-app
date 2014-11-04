// Install Service Worker
// navigator.serviceWorker.register('/scripts/worker.js').then(function(reg) {
//   console.log('◕‿◕', reg);
// }, function(err) {
//   console.log('ಠ_ಠ', err);
// });

// Select auto-binding template and use as the top level of our app
window.app = document.querySelector('#pages');
document.addEventListener('polymer-ready', function() {

  // Grab the scroller from the scroll header panel
  // We'll need this so core-list can drive our header panel
  app.scroller = document.querySelector('core-scroll-header-panel').scroller;

  var menu = document.querySelector('#btn-menu');
  var drawerPanel = document.querySelector('core-drawer-panel');

  menu.addEventListener('click', function() {
    drawerPanel.togglePanel();
  });

  // custom transformation: scale header's title
  var titleStyle = document.querySelector('.title').style;
  document.addEventListener('core-header-transform', function(e) {
    var d = e.detail;
    var m = d.height - d.condensedHeight;
    var scale = Math.max(0.55, (m - d.y) / (m / 0.25)  + 0.55);
    titleStyle.transform = titleStyle.webkitTransform =
        'scale(' + scale + ') translateZ(0)';
  });

});
