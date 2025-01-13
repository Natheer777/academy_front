const CACHE_NAME = "vite-react-offline-cache-v166";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/index.CtScNRjG.js",
        "/assets/index.CHJ8Lgvj.css",
        "/assets/vendor.CqcSyPVE.js",
        "/Fonts/ScheherazadeNew-Bold.CrbhGG_h.ttf",
        "/About",
        "/Date",
        "/Login",
        "/Articles",
        "/Level_division",
        "/Register",
        "/Teachers",
        "/Study_materials",
        "/More_services",
        "/Support",
        "/Register_account",
        "/Login_users",
        "/Dash_users/:userId",
        "/Comments",
        "/Questions",
        "/Terms",
        "/Dash_Teachers",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    // تخطي الطلبات التي ليست من النوع GET
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => cache.match(event.request));
    })
  );
});
