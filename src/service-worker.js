import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import {
    NetworkFirst,
    StaleWhileRevalidate,
    CacheFirst
} from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

clientsClaim()
self.skipWaiting()

// cleanupOutdatedCaches()
// 정적 자산 사전 캐싱
precacheAndRoute(self.__WB_MANIFEST)

// API 요청 캐싱
registerRoute(
    ({ url }) => url.pathname.startsWith('/index.html'),
    new NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24시간
            })
        ]
    })
)

// 이미지 캐싱
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30일
            })
        ]
    })
)

// 폰트 캐싱
registerRoute(
    ({ request }) => request.destination === 'font',
    new StaleWhileRevalidate({
        cacheName: 'fonts-cache'
    })
)
