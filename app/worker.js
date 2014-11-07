importScripts('/bower_components/cache-polyfill/dist/serviceworker-cache-polyfill.js');

// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
console.log('SW startup');

self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    cachesPolyfill.open('myapp-static-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/app.js',
        '/elements/elements.critical.vulcanized.html'
      ]);
    })
  )
});

self.addEventListener('activate', function(event) {
  console.log('SW activated');
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);

  if (requestURL.hostname == 's3.amazonaws.com') {
    event.respondWith(s3Response(event.request));
  } else {
    event.respondWith(
      cachesPolyfill.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

function s3Response(request) {
  return cachesPolyfill.match(request).then(function(response) {
    if (response) {
      return response;
    }

    return fetch(request).then(function(response) {
      cachesPolyfill.open('s3-imgs').then(function(cache) {
        cache.put(request, response).then(function() {
          console.log('yey img cache');
        }, function() {
          console.log('nay img cache');
        });
      });

      return response.clone();
    });
  });
}
