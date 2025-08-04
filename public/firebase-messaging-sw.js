// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts(
    'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
)

// Firebase 설정 - 실제 프로젝트에서 Firebase Console에서 가져온 설정으로 교체하세요
const firebaseConfig = {
    apiKey: 'AIzaSyBcVrmabmGK92icv3UIZJHECw1HCxerEFg',
    authDomain: 'firbase-cloud-message-38064.firebaseapp.com',
    projectId: 'firbase-cloud-message-38064',
    storageBucket: 'firbase-cloud-message-38064.firebasestorage.app',
    messagingSenderId: '73789941762',
    appId: '1:73789941762:web:45edf9adcd9630aa7bdf1b'
}

// Firebase 초기화
firebase.initializeApp(firebaseConfig)

// FCM 메시징 인스턴스
const messaging = firebase.messaging()

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(payload => {
    console.log('FCM 백그라운드 메시지 수신:', payload)

    // const notificationTitle = payload.notification?.title || '새로운 알림'
    // const notificationOptions = {
    //     body: payload.notification?.body || '새로운 알림이 있습니다.',
    //     icon: payload.notification?.icon || '/icon-192.png',
    //     badge: payload.notification?.badge || '/icon-192.png',
    //     tag: payload.data?.tag || 'fcm-notification',
    //     data: payload.data || {},
    //     actions: payload.notification?.actions || [],
    //     requireInteraction: payload.data?.requireInteraction || false,
    //     silent: payload.data?.silent || false
    // }

    // return self.registration.showNotification(
    //     notificationTitle,
    //     notificationOptions
    // )
})

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
    console.log('알림 클릭:', event)

    event.notification.close()

    if (event.action) {
        // 액션 버튼 클릭 처리
        console.log('액션 클릭:', event.action)
    } else {
        // 알림 자체 클릭 처리
        const urlToOpen = event.notification.data?.url || '/'

        event.waitUntil(
            clients
                .matchAll({ type: 'window', includeUncontrolled: true })
                .then(clientList => {
                    // 이미 열린 탭이 있는지 확인
                    for (const client of clientList) {
                        if (client.url === urlToOpen && 'focus' in client) {
                            return client.focus()
                        }
                    }

                    // 새 탭 열기
                    if (clients.openWindow) {
                        return clients.openWindow(urlToOpen)
                    }
                })
        )
    }
})

// 알림 닫기 처리
self.addEventListener('notificationclose', event => {
    console.log('알림 닫힘:', event)
})
