// service-worker.js

const CACHE_NAME = "vite-react-offline-cache-v19"; // تأكد من تغيير الرقم مع كل تحديث

self.addEventListener("install", (event) => {
  self.skipWaiting(); // إجبار الـ Service Worker على التحديث فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/vendor-BBiYQvzW.js",
        "/assets/index-BLB2oqAz.js",
        "/assets/index-BbQxl5CN.css",
        "/Fonts/ScheherazadeNew-Bold.ttf",
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
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  // حذف الكاش القديم عند تنشيط النسخة الجديدة
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // حذف الكاش القديم
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
    })
  );
});
