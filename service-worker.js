var CACHE = 'mazipan-cache';

// On install, cache some resources.
self.addEventListener('install', function(evt) {
  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(
    fromNetwork(evt.request, 400)
    .catch(function () {
      return fromCache(evt.request);
    })
  );

  evt.waitUntil(update(evt.request));

  // evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  // evt.waitUntil(update(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './index.html',
      './favicon/favicon-96x96.png', 
      './favicon/favicon-32x32.png', 
      './favicon/favicon-16x16.png',      
      './images/brand.png',
      './images/full-blipulsa-data.jpg',
      './images/full-blipulsa.png',
      './images/full-cms.jpg',
      './images/full-incident.jpg',
      './images/full-library-extjs.jpg',
      './images/full-library-servlet.jpg',
      './images/full-network.jpg',
      './images/full-servo-availibility.jpg',
      './images/full-servo.png',
      './images/full-siaga.jpg',
      './images/full-suggestion.jpg',
      './images/full-tmnd.png',
      './images/full-transport.jpg',
      './images/full-webportal.png',
      './images/irfan-maulana-recommendation-1.jpg',
      './images/irfan-maulana-recommendation-2.jpg',
      './images/irfan-maulana-recommendation-3.jpg',
      './images/irfan-maulana-recommendation-4.jpg',
      './images/irfan-maulana-recommendation-5.jpg',
      './images/irfan-maulana-recommendation-6.jpg',
      './images/irfan-maulana-recommendation-7.jpg',
      './images/irfan-maulana.jpg',
      './images/logo-bliblidotcom.png',
      './images/logo-smltech.PNG',
      './images/slide-1.JPG',
      './images/slide-2.JPG',
      './images/slide-3.jpg',

      './library/jquery.inview.min.js',
      './library/jquery.isotope.min.js',
      './library/jquery.min.js',
      './library/owl.carousel.css',
      './library/owl.carousel.min.js',
      './library/owl.theme.css',
      './library/owl.transitions.css',
      './library/prism.min.css',
      './library/prism.min.js',
      './library/responsiveslides.min.js',

      './build/dist/main.min.js',
      './build/dist/site.min.css',
      './build/dist/site__simple.min.css',

      'https://mazipan.github.io/bem-kit/dist/bem-kit.min.css',
      'https://mazipan.github.io/lightweight-admin-template/dist/lightweight-admin-template.min.css'
    ]);
  });
}

// Time limited network request. If the network fails or the response is not
// served before timeout, the promise is rejected.
function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    // Reject in case of timeout.
    var timeoutId = setTimeout(reject, timeout);
    // Fulfill in case of success.
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    // Reject also if network fetch rejects.
    }, reject);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('request-not-in-cache');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}