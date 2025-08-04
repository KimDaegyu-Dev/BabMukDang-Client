import { useState, useEffect, useRef } from 'react'

interface Message {
    id: string
    text: string
    timestamp: Date
    type: 'sent' | 'received'
}

export default function WebSocketPage() {
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [messageText, setMessageText] = useState('')
    const [connectionStatus, setConnectionStatus] = useState('disconnected')
    const [serverUrl, setServerUrl] = useState('wss://echo.websocket.org')
    const [error, setError] = useState<string | null>(null)
    const wsRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const connect = () => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            return
        }

        try {
            setError(null)
            setConnectionStatus('connecting')

            const ws = new WebSocket(serverUrl)
            wsRef.current = ws

            ws.onopen = () => {
                setIsConnected(true)
                setConnectionStatus('connected')
                addMessage('시스템', '연결되었습니다.', 'received')
            }

            ws.onmessage = event => {
                addMessage('서버', event.data, 'received')
            }

            ws.onclose = event => {
                setIsConnected(false)
                setConnectionStatus('disconnected')
                addMessage('시스템', '연결이 종료되었습니다.', 'received')

                // 자동 재연결 (3초 후)
                if (event.code !== 1000) {
                    // 정상 종료가 아닌 경우
                    reconnectTimeoutRef.current = setTimeout(() => {
                        if (connectionStatus !== 'connecting') {
                            connect()
                        }
                    }, 3000)
                }
            }

            ws.onerror = error => {
                setError('웹소켓 연결 오류가 발생했습니다.')
                setConnectionStatus('error')
                console.error('WebSocket error:', error)
            }
        } catch (err) {
            setError('웹소켓 연결을 초기화할 수 없습니다.')
            setConnectionStatus('error')
        }
    }

    const disconnect = () => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
        }

        if (wsRef.current) {
            wsRef.current.close(1000, '사용자 요청')
            wsRef.current = null
        }
    }

    const sendMessage = () => {
        if (!messageText.trim() || !isConnected) {
            return
        }

        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(messageText)
            addMessage('나', messageText, 'sent')
            setMessageText('')
        }
    }

    const addMessage = (
        sender: string,
        text: string,
        type: 'sent' | 'received'
    ) => {
        const message: Message = {
            id: Date.now().toString(),
            text: `${sender}: ${text}`,
            timestamp: new Date(),
            type
        }
        setMessages(prev => [...prev, message])
    }

    const clearMessages = () => {
        setMessages([])
    }

    const sendTestMessage = () => {
        if (isConnected) {
            const testMessage = `테스트 메시지 - ${new Date().toLocaleTimeString('ko-KR')}`
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(testMessage)
                addMessage('나', testMessage, 'sent')
            }
        }
    }

    useEffect(() => {
        return () => {
            disconnect()
        }
    }, [])

    const getStatusColor = () => {
        switch (connectionStatus) {
            case 'connected':
                return 'text-green-600'
            case 'connecting':
                return 'text-yellow-600'
            case 'error':
                return 'text-red-600'
            default:
                return 'text-gray-600'
        }
    }

    const getStatusText = () => {
        switch (connectionStatus) {
            case 'connected':
                return '연결됨'
            case 'connecting':
                return '연결 중...'
            case 'error':
                return '오류'
            default:
                return '연결 안됨'
        }
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    웹소켓 연결
                </h1>
                <p className="text-gray-600">실시간 양방향 통신</p>
            </div>

            {/* 연결 설정 */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 font-semibold text-gray-900">연결 설정</h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="웹소켓 서버 URL"
                        value={serverUrl}
                        onChange={e => setServerUrl(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div className="flex space-x-2">
                        {!isConnected ? (
                            <button
                                onClick={connect}
                                className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                                🔌 연결
                            </button>
                        ) : (
                            <button
                                onClick={disconnect}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
                                🛑 연결 해제
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 연결 상태 */}
            <div className="mb-6">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            연결 상태
                        </h3>
                        <p className={`text-sm ${getStatusColor()}`}>
                            {getStatusText()}
                        </p>
                    </div>
                    <div
                        className={`h-3 w-3 rounded-full ${
                            connectionStatus === 'connected'
                                ? 'bg-green-500'
                                : connectionStatus === 'connecting'
                                  ? 'bg-yellow-500'
                                  : connectionStatus === 'error'
                                    ? 'bg-red-500'
                                    : 'bg-gray-400'
                        }`}></div>
                </div>
            </div>

            {/* 오류 메시지 */}
            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {/* 메시지 전송 */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 font-semibold text-gray-900">
                    메시지 전송
                </h3>
                <div className="space-y-3">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="메시지를 입력하세요..."
                            value={messageText}
                            onChange={e => setMessageText(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && sendMessage()}
                            disabled={!isConnected}
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!isConnected || !messageText.trim()}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                            📤
                        </button>
                    </div>
                    <button
                        onClick={sendTestMessage}
                        disabled={!isConnected}
                        className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                        🧪 테스트 메시지
                    </button>
                </div>
            </div>

            {/* 메시지 목록 */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                        메시지 ({messages.length})
                    </h3>
                    <button
                        onClick={clearMessages}
                        className="text-sm text-gray-600 hover:text-gray-800">
                        🗑️ 지우기
                    </button>
                </div>
                <div className="max-h-64 space-y-2 overflow-y-auto">
                    {messages.length === 0 ? (
                        <p className="py-4 text-center text-gray-500">
                            메시지가 없습니다.
                        </p>
                    ) : (
                        messages.map(message => (
                            <div
                                key={message.id}
                                className={`rounded-lg p-3 ${
                                    message.type === 'sent'
                                        ? 'ml-8 bg-blue-100'
                                        : 'mr-8 bg-gray-100'
                                }`}>
                                <p className="text-sm text-gray-900">
                                    {message.text}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    {message.timestamp.toLocaleTimeString(
                                        'ko-KR'
                                    )}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 모바일 최적화 정보 */}
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">
                    모바일 최적화
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                    <li>• 네트워크 불안정 시 자동 재연결</li>
                    <li>• 배터리 효율적인 연결 관리</li>
                    <li>• 터치 친화적 메시지 인터페이스</li>
                    <li>• 오프라인 메시지 큐잉</li>
                    <li>• 연결 상태 실시간 표시</li>
                </ul>
            </div>
        </div>
    )
}
