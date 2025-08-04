import { useState, useEffect } from 'react'
import {
    initializeFirebase,
    getFCMToken,
    onForegroundMessage,
    firebaseConfig
} from '../firebase'

interface DeviceInfo {
    platform: 'ios' | 'android' | 'desktop' | 'unknown'
    isIOS: boolean
    isAndroid: boolean
    isMobile: boolean
    supportsPush: boolean
    supportsServiceWorker: boolean
}

interface FCMSubscription {
    token: string
    platform: string
    userAgent: string
}

export default function PushNotificationPage() {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
    const [subscription, setSubscription] = useState<FCMSubscription | null>(
        null
    )
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        detectDevice()
        checkSubscription()
        setupForegroundMessageHandler()
    }, [])

    const detectDevice = () => {
        const userAgent = navigator.userAgent.toLowerCase()
        const platform = navigator.platform.toLowerCase()

        const isIOS =
            /iphone|ipad|ipod/.test(userAgent) ||
            (platform === 'macintel' && navigator.maxTouchPoints > 1)
        const isAndroid = /android/.test(userAgent)
        const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent)

        const supportsPush = 'PushManager' in window
        const supportsServiceWorker = 'serviceWorker' in navigator

        setDeviceInfo({
            platform: isIOS
                ? 'ios'
                : isAndroid
                  ? 'android'
                  : isMobile
                    ? 'desktop'
                    : 'unknown',
            isIOS,
            isAndroid,
            isMobile,
            supportsPush,
            supportsServiceWorker
        })
    }

    const setupForegroundMessageHandler = () => {
        // 포그라운드 메시지 처리
        const unsubscribe = onForegroundMessage(payload => {
            console.log('포그라운드 메시지 수신:', payload)

            // 브라우저 알림 표시
            if (
                'Notification' in window &&
                Notification.permission === 'granted'
            ) {
                const notification = new Notification(
                    payload.notification?.title || '새로운 알림',
                    {
                        body:
                            payload.notification?.body ||
                            '새로운 알림이 있습니다.',
                        icon: payload.notification?.icon || '/icon-192.png',
                        badge: payload.notification?.badge || '/icon-192.png',
                        tag: payload.data?.tag || 'fcm-notification',
                        data: payload.data || {}
                    }
                )

                // 알림 클릭 처리
                notification.onclick = () => {
                    window.focus()
                    notification.close()

                    if (payload.data?.url) {
                        window.location.href = payload.data.url
                    }
                }
            }
        })

        return unsubscribe
    }

    const checkSubscription = async () => {
        // 로컬 스토리지에서 저장된 구독 정보 확인
        const savedSubscription = localStorage.getItem('fcm-subscription')
        if (savedSubscription) {
            try {
                const subscription = JSON.parse(savedSubscription)
                setSubscription(subscription)
                setIsSubscribed(true)
                console.log('저장된 FCM 구독 발견:', subscription)
            } catch (error) {
                console.error('저장된 구독 정보 파싱 실패:', error)
                localStorage.removeItem('fcm-subscription')
            }
        }
    }

    const requestNotificationPermission = async (): Promise<boolean> => {
        if (!('Notification' in window)) {
            setError('이 브라우저는 알림을 지원하지 않습니다.')
            return false
        }

        if (Notification.permission === 'granted') {
            return true
        }

        if (Notification.permission === 'denied') {
            setError(
                '알림 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.'
            )
            return false
        }

        const permission = await Notification.requestPermission()
        return permission === 'granted'
    }

    const subscribeToFCM = async () => {
        if (!deviceInfo?.supportsServiceWorker) {
            setError('Service Worker가 지원되지 않습니다.')
            return
        }

        // Firebase 설정 검증
        if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
            setError('Firebase 설정을 입력해주세요.')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // 알림 권한 요청
            const hasPermission = await requestNotificationPermission()
            if (!hasPermission) {
                return
            }

            // Firebase 초기화
            initializeFirebase(firebaseConfig)

            // Service Worker 등록
            if (!('serviceWorker' in navigator)) {
                throw new Error('Service Worker가 지원되지 않습니다.')
            }

            const registration = await navigator.serviceWorker.register(
                '/firebase-messaging-sw.js'
            )
            console.log('Service Worker 등록됨:', registration)

            // FCM 토큰 가져오기
            const token = await getFCMToken(
                'BFVVkU8icq66AXThnZDilKAT6lDyA-ou_k512ugWbFGrTtmKVJ50QlZG9FGU0535y_CS-hBy13dcx_U3du8AFfs'
            )
            if (!token) {
                throw new Error('FCM 토큰을 가져올 수 없습니다.')
            }

            // 구독 정보 생성
            const fcmSubscription: FCMSubscription = {
                token,
                platform: deviceInfo.platform,
                userAgent: navigator.userAgent
            }

            setSubscription(fcmSubscription)
            setIsSubscribed(true)

            // 로컬 스토리지에 저장
            localStorage.setItem(
                'fcm-subscription',
                JSON.stringify(fcmSubscription)
            )

            // 서버에 구독 정보 전송

            console.log('FCM 구독 성공:', fcmSubscription)
        } catch (error) {
            console.error('FCM 구독 실패:', error)
            setError('FCM 구독에 실패했습니다: ' + (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    const unsubscribeFromFCM = async () => {
        if (!subscription) return

        setIsLoading(true)
        setError(null)

        try {
            // 서버에서 구독 정보 삭제

            // 로컬 스토리지에서 삭제
            localStorage.removeItem('fcm-subscription')

            setSubscription(null)
            setIsSubscribed(false)

            console.log('FCM 구독 해제 성공')
        } catch (error) {
            console.error('FCM 구독 해제 실패:', error)
            setError('FCM 구독 해제에 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    const getPlatformInfo = () => {
        if (!deviceInfo) return '로딩 중...'

        const platformNames = {
            ios: 'iOS',
            android: 'Android',
            desktop: 'Desktop',
            unknown: 'Unknown'
        }

        return `${platformNames[deviceInfo.platform]} (${deviceInfo.isMobile ? 'Mobile' : 'Desktop'})`
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    FCM 푸시 알림
                </h1>
                <p className="text-gray-600">
                    Firebase Cloud Messaging을 활용한 서버 푸시 알림
                </p>
            </div>

            {/* 디바이스 정보 */}
            {deviceInfo && (
                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        디바이스 정보
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">플랫폼:</span>
                            <span className="font-medium">
                                {getPlatformInfo()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">
                                Push API 지원:
                            </span>
                            <span
                                className={
                                    deviceInfo.supportsPush
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }>
                                {deviceInfo.supportsPush
                                    ? '✅ 지원'
                                    : '❌ 미지원'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">
                                Service Worker 지원:
                            </span>
                            <span
                                className={
                                    deviceInfo.supportsServiceWorker
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }>
                                {deviceInfo.supportsServiceWorker
                                    ? '✅ 지원'
                                    : '❌ 미지원'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* 오류 메시지 */}
            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {/* 구독 설정 */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 font-semibold text-gray-900">구독 설정</h3>
                <div className="flex space-x-2">
                    {!isSubscribed ? (
                        <button
                            onClick={subscribeToFCM}
                            disabled={
                                isLoading || !deviceInfo?.supportsServiceWorker
                            }
                            className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                            {isLoading ? '구독 중...' : '🔔 FCM 구독'}
                        </button>
                    ) : (
                        <button
                            onClick={unsubscribeFromFCM}
                            disabled={isLoading}
                            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                            {isLoading ? '해제 중...' : '🛑 구독 해제'}
                        </button>
                    )}
                </div>
            </div>

            {/* 구독 상태 */}
            {subscription && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                    <h3 className="mb-2 font-semibold text-green-900">
                        ✅ FCM 구독됨
                    </h3>
                    <p className="text-sm text-green-800">
                        Firebase Cloud Messaging을 통해 푸시 알림을 받을 수
                        있습니다.
                    </p>
                    <details className="mt-2">
                        <summary className="cursor-pointer text-sm text-green-700">
                            FCM 토큰 보기
                        </summary>
                        <pre className="mt-2 overflow-auto rounded bg-white p-2 text-xs">
                            {subscription.token}
                        </pre>
                    </details>
                </div>
            )}

            {/* FCM 정보 */}
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">
                    Firebase Cloud Messaging
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                    <li>• 모든 플랫폼에서 일관된 푸시 알림 지원</li>
                    <li>• iOS Safari에서도 완전 지원</li>
                    <li>• 백그라운드 및 포그라운드 메시지 처리</li>
                    <li>• 실시간 메시지 전송 및 수신</li>
                    <li>• Firebase Console에서 메시지 관리</li>
                </ul>
            </div>
        </div>
    )
}
