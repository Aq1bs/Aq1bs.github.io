self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('al-hira-cache').then(cache => {
      return cache.addAll([
        './index.html',
        './styles.css',
        './script.js',
        './alhiracentre'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});