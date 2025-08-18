import { useState, useEffect } from 'react'

export function NotificationPage() {
    const [permission, setPermission] =
        useState<NotificationPermission>('default')
    const [notificationTitle, setNotificationTitle] = useState('')
    const [notificationBody, setNotificationBody] = useState('')
    const [scheduledTime, setScheduledTime] = useState('')
    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {
        checkPermission()
    }, [])

    const checkPermission = () => {
        if ('Notification' in window) {
            setPermission(Notification.permission)
        }
    }

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('이 브라우저는 알림을 지원하지 않습니다.')
            return
        }

        try {
            const result = await Notification.requestPermission()
            setPermission(result)
        } catch (error) {
            console.error('알림 권한 요청 실패:', error)
        }
    }

    const sendLocalNotification = () => {
        if (permission !== 'granted') {
            alert('알림 권한이 필요합니다.')
            return
        }

        if (!notificationTitle.trim()) {
            alert('알림 제목을 입력해주세요.')
            return
        }

        const notification = new Notification(notificationTitle, {
            body: notificationBody || '새로운 알림이 있습니다.',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: 'pwa-notification',
            requireInteraction: false,
            silent: false
        })

        notification.onclick = () => {
            window.focus()
            notification.close()
        }

        setNotifications(prev => [...prev, notification])

        // 입력 필드 초기화
        setNotificationTitle('')
        setNotificationBody('')
    }

    const scheduleNotification = () => {
        if (permission !== 'granted') {
            alert('알림 권한이 필요합니다.')
            return
        }

        if (!notificationTitle.trim() || !scheduledTime) {
            alert('알림 제목과 예약 시간을 입력해주세요.')
            return
        }

        const scheduledDate = new Date(scheduledTime)
        const now = new Date()

        if (scheduledDate <= now) {
            alert('예약 시간은 현재 시간보다 이후여야 합니다.')
            return
        }

        const delay = scheduledDate.getTime() - now.getTime()

        setTimeout(() => {
            const notification = new Notification(notificationTitle, {
                body: notificationBody || '예약된 알림입니다.',
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                tag: 'scheduled-notification',
                requireInteraction: false,
                silent: false
            })

            notification.onclick = () => {
                window.focus()
                notification.close()
            }

            setNotifications(prev => [...prev, notification])
        }, delay)

        alert(
            `알림이 ${scheduledDate.toLocaleString('ko-KR')}에 예약되었습니다.`
        )

        // 입력 필드 초기화
        setNotificationTitle('')
        setNotificationBody('')
        setScheduledTime('')
    }

    const sendTestNotification = () => {
        if (permission !== 'granted') {
            alert('알림 권한이 필요합니다.')
            return
        }

        const notification = new Notification('테스트 알림', {
            body: 'PWA 알림 기능이 정상적으로 작동합니다!',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: 'test-notification',
            requireInteraction: false,
            silent: false
        })

        notification.onclick = () => {
            window.focus()
            notification.close()
        }

        setNotifications(prev => [...prev, notification])
    }

    const clearNotifications = () => {
        setNotifications([])
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    알림 시스템
                </h1>
                <p className="text-gray-600">로컬 및 푸시 알림</p>
            </div>

            {/* 권한 상태 */}
            <div className="mb-6">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            알림 권한
                        </h3>
                        <p className="text-sm text-gray-600">
                            {permission === 'granted' && '✅ 권한 허용됨'}
                            {permission === 'denied' && '❌ 권한 거부됨'}
                            {permission === 'default' && '⏳ 권한 요청 필요'}
                        </p>
                    </div>
                    {permission !== 'granted' && (
                        <button
                            onClick={requestPermission}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                            권한 요청
                        </button>
                    )}
                </div>
            </div>

            {/* 즉시 알림 */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 font-semibold text-gray-900">즉시 알림</h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="알림 제목"
                        value={notificationTitle}
                        onChange={e => setNotificationTitle(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <textarea
                        placeholder="알림 내용 (선택사항)"
                        value={notificationBody}
                        onChange={e => setNotificationBody(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={3}
                    />
                    <button
                        onClick={sendLocalNotification}
                        disabled={permission !== 'granted'}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                        🔔 알림 보내기
                    </button>
                </div>
            </div>

            {/* 예약 알림 */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 font-semibold text-gray-900">예약 알림</h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="알림 제목"
                        value={notificationTitle}
                        onChange={e => setNotificationTitle(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <textarea
                        placeholder="알림 내용 (선택사항)"
                        value={notificationBody}
                        onChange={e => setNotificationBody(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={3}
                    />
                    <input
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={e => setScheduledTime(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={scheduleNotification}
                        disabled={permission !== 'granted'}
                        className="w-full rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                        ⏰ 알림 예약
                    </button>
                </div>
            </div>

            {/* 테스트 버튼 */}
            <div className="mb-6 space-y-3">
                <button
                    onClick={sendTestNotification}
                    disabled={permission !== 'granted'}
                    className="w-full rounded-lg bg-yellow-600 px-4 py-3 text-white transition-colors hover:bg-yellow-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                    🧪 테스트 알림
                </button>

                <button
                    onClick={clearNotifications}
                    className="w-full rounded-lg bg-gray-600 px-4 py-3 text-white transition-colors hover:bg-gray-700">
                    🗑️ 알림 기록 삭제
                </button>
            </div>

            {/* 알림 기록 */}
            {notifications.length > 0 && (
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        알림 기록 ({notifications.length})
                    </h3>
                    <div className="space-y-2">
                        {notifications.map((notification, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-gray-50 p-3">
                                <p className="font-medium text-gray-900">
                                    {notification.title}
                                </p>
                                {notification.body && (
                                    <p className="text-sm text-gray-600">
                                        {notification.body}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 모바일 최적화 정보 */}
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">
                    모바일 최적화
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                    <li>• 터치 친화적 알림 인터페이스</li>
                    <li>• 배터리 효율적인 알림 관리</li>
                    <li>• 오프라인 알림 큐잉</li>
                    <li>• 푸시 알림 지원</li>
                    <li>• 알림 클릭 시 앱 포커스</li>
                </ul>
            </div>
        </div>
    )
}
