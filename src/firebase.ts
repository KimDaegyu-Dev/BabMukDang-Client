import { initializeApp, FirebaseApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    Messaging
} from 'firebase/messaging'

// 기본 Firebase 설정 - 실제 프로젝트에서 Firebase Console에서 가져온 설정으로 교체하세요
export const firebaseConfig = {
    apiKey: 'AIzaSyBcVrmabmGK92icv3UIZJHECw1HCxerEFg',
    authDomain: 'firbase-cloud-message-38064.firebaseapp.com',
    projectId: 'firbase-cloud-message-38064',
    storageBucket: 'firbase-cloud-message-38064.firebasestorage.app',
    messagingSenderId: '73789941762',
    appId: '1:73789941762:web:45edf9adcd9630aa7bdf1b'
}

let app: FirebaseApp | null = null
let messaging: Messaging | null = null

// Firebase 앱 초기화
export const initializeFirebase = (config: any) => {
    if (app) {
        // 이미 초기화된 경우 기존 앱 반환
        return app
    }

    app = initializeApp(config)
    messaging = getMessaging(app)
    return app
}

// FCM 메시징 인스턴스 가져오기
export const getMessagingInstance = (): Messaging | null => {
    return messaging
}

// FCM 토큰 가져오기
export const getFCMToken = async (
    vapidKey?: string
): Promise<string | null> => {
    if (!messaging) {
        console.error('Firebase가 초기화되지 않았습니다.')
        return null
    }

    try {
        const currentToken = await getToken(messaging, {
            vapidKey: vapidKey || 'your-vapid-key' // Firebase Console에서 생성한 VAPID 키
        })

        if (currentToken) {
            console.log('FCM 토큰:', currentToken)
            return currentToken
        } else {
            console.log('FCM 토큰을 가져올 수 없습니다.')
            return null
        }
    } catch (error) {
        console.error('FCM 토큰 가져오기 실패:', error)
        return null
    }
}

// 포그라운드 메시지 처리
export const onForegroundMessage = (callback: (payload: any) => void) => {
    if (!messaging) {
        console.error('Firebase가 초기화되지 않았습니다.')
        return () => {}
    }

    return onMessage(messaging, payload => {
        console.log('포그라운드 메시지 수신:', payload)
        callback(payload)
    })
}

// 기본 앱 인스턴스 (기존 코드와의 호환성을 위해)
export default app
