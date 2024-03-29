var cacheid = "cache-v1",
    cachedUrls = ["/", "/dontleave.html"];
self.addEventListener("install", function (e) {
    e.waitUntil(caches.open(cacheid).then(function (e) {
        return console.log("Opened cache"), e.addAll(cachedUrls)
    }))
}), self.addEventListener("fetch", function (e) {
    e.respondWith(caches.match(e.request).then(function (n) {
        return n || fetch(e.request).then(function (n) {
            if (!n || 200 !== n.status || "basic" !== n.type) return n;
            var t = n.clone();
            return caches.open(cacheid).then(function (n) {
                n.put(e.request, t)
            }), n
        })
    }))
}), self.addEventListener("activate", function (e) {
    var n = ["cache-v7"];
    e.waitUntil(caches.keys().then(function (e) {
        return Promise.all(e.map(function (e) {
            if (-1 === n.indexOf(e)) return caches.delete(e)
        }))
    }))
});
