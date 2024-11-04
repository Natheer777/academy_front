// serviceWorkerRegistration.js

const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
    "./", // الصفحة الرئيسية
    "/client/index.html", // ملف HTML الأساسي
    "/client/dist/index.html", // ملف HTML الأساسي
    "/client/dist/assets/vendor-BBiYQvzW.js", // ملف JavaScript
    "/client/dist/assets/index-K1BLlKbo.css", // ملف CSS
    "/client/dist/assets/index-Cov5Vz6_.js" // ملف JavaScript إضافي
];

// تثبيت Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files");
            return cache.addAll(urlsToCache);
        })
    );
});

// استجابة الطلبات
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// وظيفة لتسجيل Service Worker
export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/serviceWorkerRegistration.js') // تأكد من المسار الصحيح
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}
