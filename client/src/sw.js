/* eslint-disable */
if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
  );

  self.addEventListener('install', () => {
    self.skipWaiting();
  });

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    workbox.precaching.precacheAndRoute([]);

    workbox.routing.registerRoute(
      new RegExp('/.*'),
      new workbox.strategies.NetworkFirst()
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
