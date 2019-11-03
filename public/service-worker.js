'use strict';

const CACHE_NAME = 'static-cache-v7';
const DATA_CACHE_NAME = 'data-cache-v6';

const FILES_TO_CACHE = [
   '/',
   '/images/icons/Artboard-128.png',
   '/images/icons/Artboard-144.png',
   '/images/icons/Artboard-152.png',
   '/images/icons/Artboard-192.png',
   '/images/icons/Artboard-256.png',
   '/images/icons/Artboard-512.png',
   '/images/bgpattern.png',
   '/images/fb-icon-1.jpg',
   '/images/google-icon.svg',
   '/js/main.js',
   '/js/single-blog.js',
   '/js/index.js',
   '/stylesheets/style.css',
   '/css/materialize.min.css',
   '/js/materialize.min.js',
   'https://fonts.googleapis.com/icon?family=Material+Icons',
   'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
);
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  if (evt.request.url.includes("/")) {
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(evt.request)
              .then((response) => {
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              }).catch((err) => {
                return cache.match(evt.request);
              });
        }));
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
        .then((response)=>{
          return response || fetch(evt.request);
        });
    })
  );
});