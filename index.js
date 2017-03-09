'use strict'

navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister()
} });

/*
navigator
  .serviceWorker
  .register('service-worker.js', {
    scope: '/'
});
*/
