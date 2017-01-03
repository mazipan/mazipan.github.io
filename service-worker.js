var CACHE = 'cache-and-update';

// On install, cache some resources.
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
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

      'https://fonts.googleapis.com/css?family=Lobster',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css.map',
      // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/FontAwesome.otf',
      // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.svg',
      // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf',
      // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff',
      // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2'
    ]);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
