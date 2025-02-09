const CACHE_NAME = "vite-react-offline-cache-v206"; // تحديث رقم النسخة للكاش

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/index.C5c0Kicv.css",
        "/assets/index.t6g_OmOq.js",
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
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // استرجاع الملفات المخزنة مباشرة
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match("/")); // إعادة توجيه عند فقدان الاتصال
    })
  );
});
