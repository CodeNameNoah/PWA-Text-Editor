// Importing necessary modules from the Workbox library
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precaching and routing static assets using the provided manifest
precacheAndRoute(self.__WB_MANIFEST);

// Creating a CacheFirst strategy for caching and serving pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Caching responses with status codes 0 (for offline) and 200 (OK)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Expiring cached responses after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warming the page cache for specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Registering a route for navigating requests, using the page cache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Registering a route for caching assets (stylesheets, scripts, workers) with a StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      // Caching responses with status codes 0 (for offline) and 200 (OK)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // Expiring cached responses after 30 days
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
