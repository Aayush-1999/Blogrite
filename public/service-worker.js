"use strict";

const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
   "/",
   "/images/icons/Artboard-128.png",
   "/images/icons/Artboard-144.png",
   "/images/icons/Artboard-152.png",
   "/images/icons/Artboard-192.png",
   "/images/icons/Artboard-256.png",
   "/images/icons/Artboard-512.png",
   "/images/bgpattern.png",
   "/images/fb-icon-1.jpg",
   "/images/google-icon.svg",
   "/js/main.js",
   "/js/single-blog.js",
   "/stylesheets/style.css",
   "/css/materialize.min.css",
   "/js/materialize.min.js",
   "/offline.html",
   "https://fonts.googleapis.com/icon?family=Material+Icons",
   "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
];

function cleanResponse(response) {
  const clonedResponse = response.clone();

  // Not all browsers support the Response.body stream, so fall back to reading
  // the entire body into memory as a blob.
  const bodyPromise = "body" in clonedResponse ?
    Promise.resolve(clonedResponse.body) :
    clonedResponse.blob();

  return bodyPromise.then((body) => {
    // new Response() is happy when passed either a stream or a Blob.
    return new Response(body, {
      headers: clonedResponse.headers,
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
    });
  });
}

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME  && key !== DATA_CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// STATIC CHACHE OFFLINE EXPERIENCE
// self.addEventListener("fetch", (evt) => {
//   if (evt.request.mode !== "navigate") {
//      Not a page navigation, bail.
//     return;
//   }
//   evt.respondWith(
//       fetch(evt.request)
//           .catch(() => {
//             return caches.open(CACHE_NAME)
//                 .then((cache) => {
//                   return cache.match("offline.html");
//                 });
//           })
//   );
// });


//STATIC AND DYNAMIC CACHE OFFLINE EXPERIENCE
self.addEventListener("fetch", (evt) => {
  if (evt.request.url.includes("/blog")) {
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(evt.request)
              .then((response) => {
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                console.log("network response /blog");
                return response;
              }).catch((err) => {
                return cache.match(evt.request)
                  .then((response)=>{
                    if(response){
                      console.log("cache response /blog");
                        return response;
                    }
                    else{
                      return caches.open(CACHE_NAME)
                        .then((cache)=>{
                            return cache.match("/offline.html");
                        });        
                    }
                  })
              });
        }));
    return;
  }
  // if (evt.request.url.includes("/")) {
  //   evt.respondWith(
  //       caches.open(DATA_CACHE_NAME).then((cache) => {
  //         return fetch(evt.request)
  //             .then((response) => {
  //               if (response.status === 200) {
  //                 cache.put(evt.request.url, response.clone());
  //               }
  //               return response;
  //             }).catch((err) => {
  //               return cache.match(evt.request)
  //                 .then((response)=>{
  //                   if(response){
  //                     if(response.redirected){
  //                       return cleanResponse(response);
  //                     }
  //                     else{
  //                       return response;
  //                     }
  //                   }
  //                   else{
  //                     return caches.open(CACHE_NAME)
  //                       .then((cache)=>{
  //                           return cache.match("/offline.html");
  //                       });        
  //                   }
  //                 })
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
  //   })p
  // );

  else if (evt.request.url.includes("/")) {
    evt.respondWith(
       fetch(evt.request)
        .then((res)=> {
          return caches.open(DATA_CACHE_NAME)
            .then((cache)=> {
              cache.put(evt.request.url, res.clone());
              console.log("network response /");
              return res;
            })
        })
        .catch((err)=> {
          return caches.match(evt.request)
            .then((response)=> {
              if (response) {
                if(response.redirected){
                  console.log("cache response /");
                  return cleanResponse(response);
                }
                else{
                  return response;
                }
              }
              else{
                return caches.open(CACHE_NAME)
                  .then((cache)=>{
                    return cache.match("/offline.html");
                  });
              }
            });
        })
      );
    return;
  }
  //   evt.respondWith(
  //     caches.match(evt.request)
  //       .then((response)=> {
  //         if (response) {
  //           if(response.redirected){
  //             return cleanResponse(response);
  //           }
  //         else{
  //           return response;
  //         }
  //       } else {
  //         return fetch(evt.request)
  //           .then((res)=> {
  //             return caches.open(DATA_CACHE_NAME)
  //               .then((cache)=> {
  //                 cache.put(evt.request.url, res.clone());
  //                 return res;
  //               })
  //           })
  //           .catch(function (err) {
  //             return caches.open(CACHE_NAME)
  //               .then((cache)=>{
  //                   return cache.match("/offline.html");
  //               });
  //           });
  //       }
  //     })
  // );
  // }
});