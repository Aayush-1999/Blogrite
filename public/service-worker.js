/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

<<<<<<< HEAD
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = ['/offline.html',
=======
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v2';

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
   '/stylesheets/style.css',
   '/css/materialize.min.css',
   '/js/materialize.min.js',
   '/offline.html',
   'https://fonts.googleapis.com/icon?family=Material+Icons',
   'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'
>>>>>>> e8089286ff7fa72b3bbb485a8037785e84a67a31
];

self.addEventListener('install', (evt) => {
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
);
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
);
  self.clients.claim();
});

<<<<<<< HEAD
self.addEventListener('fetch', (evt) => {
  // CODELAB: Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match('offline.html');
                });
          })
  );
=======
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes("/")) {
  //   evt.respondWith(
  //       caches.open(DATA_CACHE_NAME).then((cache) => {
  //         return fetch(evt.request)
  //             .then((response) => {
  //               if (response.status === 200) {
  //                 cache.put(evt.request.url, response.clone());
  //               }
  //               return response;
  //             }).catch((err) => {
  //               return cache.match(evt.request);
  //             });
  //       }));
  //   return;
  // }
  // evt.respondWith(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     return cache.match(evt.request)
  //       .then((response)=>{
  //         return response || fetch(evt.request);
  //       });
  //   })
  // );
  event.respondWith(
    caches.match(event.request)
      .then((response)=> {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then((res)=> {
              return caches.open(DATA_CACHE_NAME)
                .then((cache)=> {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return caches.open(CACHE_NAME)
                .then((cache)=>{
                    return cache.match('/offline.html');
                });
            });
        }
      })
  );
  }
>>>>>>> e8089286ff7fa72b3bbb485a8037785e84a67a31
});