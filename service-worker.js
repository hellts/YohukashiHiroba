const CACHE_NAME = "yohukashi-hiroba-v1";

const CACHE_FILES = [
    "./",
    "./index.html",
    "./members.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


/* ================================ */
/* インストール */
/* ================================ */

self.addEventListener(
    "install",
    (event) => {

        event.waitUntil(

            caches.open(CACHE_NAME)
            .then(
                (cache) => {

                    return cache.addAll(
                        CACHE_FILES
                    );

                }
            )

        );

        self.skipWaiting();

    }
);


/* ================================ */
/* 古いキャッシュを削除 */
/* ================================ */

self.addEventListener(
    "activate",
    (event) => {

        event.waitUntil(

            caches.keys()
            .then(
                (cacheNames) => {

                    return Promise.all(

                        cacheNames
                        .filter(
                            (name) =>
                            name !== CACHE_NAME
                        )
                        .map(
                            (name) =>
                            caches.delete(name)
                        )

                    );

                }
            )

        );

        self.clients.claim();

    }
);


/* ================================ */
/* キャッシュ利用 */
/* ================================ */

self.addEventListener(
    "fetch",
    (event) => {

        event.respondWith(

            caches.match(
                event.request
            )
            .then(
                (cachedResponse) => {

                    return (
                        cachedResponse ||
                        fetch(event.request)
                    );

                }
            )

        );

    }
);
