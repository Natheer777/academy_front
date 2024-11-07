const CACHE_NAME = "vite-react-offline-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/vendor-BBiYQvzW.js",
  "/assets/index-BLB2oqAz.js",
  "/assets/index-BbQxl5CN.css",
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
  "/Dash",
  // يمكنك إضافة المزيد من الملفات هنا
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
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
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
