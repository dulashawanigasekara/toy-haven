// =====Toy Haven Service Worker=====
const CACHE_NAME = "toy-haven-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./products.html",
  "./cart.html",
  "./checkout.html",
  "./wishlist.html",
  "./support.html",
  "./contact.html",
  "./about.html",
  "./privacy.html",

  "./CSS/style.css",

  "./JavaScript/products.js",
  "./JavaScript/common.js",
  "./JavaScript/home.js",
  "./JavaScript/products-page.js",
  "./JavaScript/cart.js",
  "./JavaScript/checkout.js",
  "./JavaScript/wishlist.js",
  "./JavaScript/support.js",
  "./JavaScript/contact.js",

  "./Images/Logo.png"
];

// Install service worker
self.addEventListener("install",
  function(event){

    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache){

          return cache.addAll(FILES_TO_CACHE);

        })
    );

  }
);

// Remove old caches
self.addEventListener("activate",
  function(event){

    event.waitUntil(
      caches.keys()
        .then(function(cacheNames){

          return Promise.all(

            cacheNames.map(function(cacheName){

              if(cacheName !== CACHE_NAME){
                return caches.delete(cacheName);
              }

            })

          );

        })
    );

  }
);

// Load files from cache when possible
self.addEventListener("fetch",
  function(event){

    if(event.request.method !== "GET"){
      return;
    }

    event.respondWith(

      caches.match(event.request)
        .then(function(cachedFile){

          if(cachedFile){
            return cachedFile;
          }

          return fetch(event.request)
            .then(function(response){

              if(
                !response ||
                response.status !== 200 ||
                response.type !== "basic"
              ){
                return response;
              }

              const responseCopy = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache){

                  cache.put(
                    event.request,
                    responseCopy
                  );

                });

              return response;

            });

        })

    );

  }
);