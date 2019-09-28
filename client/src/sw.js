if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
  );

  self.addEventListener('install', function(event) {
    console.log('install')
    self.skipWaiting();
  });

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    workbox.precaching.precacheAndRoute([]);

    // /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    workbox.routing.registerRoute(
      /\.(?:js|css|html)$/,
      new workbox.strategies.NetworkFirst({
        cacheName: 'js-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 1 * 24 * 60 * 60,
            maxEntries: 40
          })
        ]
      })
    );

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
