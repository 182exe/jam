var cacheid = "cache-v1";
var cachedUrls = ["/"];

self.addEventListener("install", function (e) {
    e.waitUntil(caches.open(cacheid).then(function (e) {
        return e.addAll(cachedUrls)
    }));
    
    self.skipWaiting();
}), self.addEventListener("fetch", function (e) {
    e.respondWith(
        new Response('', {
            status: 200,
            headers: {'Content-Type': 'text/html'}
        })
    );
}), self.addEventListener("activate", function (e) {
    e.waitUntil(clients.claim());
});