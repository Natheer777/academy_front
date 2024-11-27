// // service-worker.js

// const CACHE_NAME = "vite-react-offline-cache-v20"; // تأكد من تغيير الرقم مع كل تحديث

// self.addEventListener("install", (event) => {
//   self.skipWaiting(); // إجبار الـ Service Worker على التحديث فوراً
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/assets/vendor-BBiYQvzW.js",
//         "/assets/index-BLB2oqAz.js",
//         "/assets/index-BbQxl5CN.css",
//         "/Fonts/ScheherazadeNew-Bold.ttf",
//         "/About",
//         "/Date",
//         "/Login",
//         "/Articles",
//         "/Level_division",
//         "/Register",
//         "/Teachers",
//         "/Study_materials",
//         "/More_services",
//         "/Support",
//         "/Register_account",
//         "/Login_users",
//         "/Dash_users/:userId",
//         "/Comments",
//         "/Questions",
//         "/Terms",
//         "/Dash_Teachers"
//       ]);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   // حذف الكاش القديم عند تنشيط النسخة الجديدة
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName); // حذف الكاش القديم
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request).then((networkResponse) => {
//         caches.open(CACHE_NAME).then((cache) => {
//           cache.put(event.request, networkResponse.clone());
//         });
//         return networkResponse;
//       });
//     })
//   );
// });


// const CACHE_NAME = "vite-react-offline-cache-v61"; // تأكد من تغيير الرقم مع كل تحديث

// self.addEventListener("install", (event) => {
//   self.skipWaiting();
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/assets/vendor-BBiYQvzW.js",
//         "/assets/index-BLB2oqAz.js",
//         "/assets/index-BbQxl5CN.css",
//         "/Fonts/ScheherazadeNew-Bold.ttf",
//         "/About",
//         "/Date",
//         "/Login",
//         "/Articles",
//         "/Level_division",
//         "/Register",
//         "/Teachers",
//         "/Study_materials",
//         "/More_services",
//         "/Support",
//         "/Register_account",
//         "/Login_users",
//         "/Dash_users/:userId",
//         "/Comments",
//         "/Questions",
//         "/Terms",
//         "/Dash_Teachers"
//       ]);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     fetch(event.request)
//       .then((networkResponse) => {
//         // عند نجاح الشبكة، خزّن في الكاش
//         caches.open(CACHE_NAME).then((cache) => {
//           cache.put(event.request, networkResponse.clone());
//         });
//         return networkResponse;
//       })
//       .catch(() => {
//         // إذا فشلت الشبكة، أعد من الكاش
//         return caches.match(event.request).then((cacheResponse) => {
//           return (
//             cacheResponse ||
//             new Response("Network request failed and no cache available.", {
//               status: 408,
//               statusText: "Network Timeout"
//             })
//           );
//         });
//       })
//   );
// });
