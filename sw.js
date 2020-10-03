importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.2/workbox/workbox-sw.js');

if (workbox) {
    workbox.setConfig({
        modulePathPrefix: 'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.2/workbox/'
    });

    workbox.precaching.precache(['/', '/index.html']);
    workbox.routing.registerRoute(new RegExp('^https://hm\.baidu\.com/'), workbox.strategies.networkOnly());
    workbox.routing.registerRoute(new RegExp('^https://www\.google-analytics\.com/'), workbox.strategies.networkOnly());
    workbox.routing.registerRoute(new RegExp('^https://busuanzi\.ibruce\.info/'), workbox.strategies.networkOnly());

    // JsDelivr
    workbox.routing.registerRoute(
        new RegExp('^https://cdn\.jsdelivr\.net'),
        workbox.strategies.cacheFirst({
            cacheName: 'static-lib' + cacheSuffixVersion,
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ]
        })
    );

    // Disqus
    workbox.routing.registerRoute(
        new RegExp('^https://(.*)disqus\.com'),
        workbox.strategies.networkOnly()
    );
    workbox.routing.registerRoute(
        new RegExp('^https://(.*)disquscdn\.com'),
        workbox.strategies.cacheFirst({
            cacheName: 'disqus-cdn-cache' + cacheSuffixVersion,
            plugins: [
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 10 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ]
        })
    );

    // 后缀匹配
    workbox.routing.registerRoute(
        // Cache Image File
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'img-cache' + cacheSuffixVersion,
        })
    );

    workbox.routing.registerRoute(
        // Cache CSS & JS files
        /.*\.(css|js)/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'static-assets-cache',
        })
    );

    // 默认行为
    workbox.routing.setDefaultHandler(
        workbox.strategies.networkFirst({
            options: [{
                // 超过 3s 请求没有响应则 fallback 到 cache
                networkTimeoutSeconds: 3,
            }]
        })
    );
}