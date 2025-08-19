import { useEffect, useState } from 'react'
import { useSocket } from '@/contexts/SocketContext'

type LogItem = {
    id: string
    time: string
    event: string
    payload?: unknown
}

function now(): string {
    return new Date().toLocaleTimeString('ko-KR')
}

export function SocketTestPage() {
    const { socket, roomId, userId, username } = useSocket()
    const [logs, setLogs] = useState<LogItem[]>([])

    // Form states
    const [chatText, setChatText] = useState('안녕하세요!')
    const [phaseTo, setPhaseTo] = useState<number>(2)
    const [phaseDataPhase, setPhaseDataPhase] = useState<number>(1)
    const [phaseDataJson, setPhaseDataJson] = useState<string>('{}')
    const [isReady, setIsReady] = useState<boolean>(false)
    const [placeName, setPlaceName] = useState('홍대입구역')
    const [lat, setLat] = useState<number>(37.557527)
    const [lng, setLng] = useState<number>(126.92516)
    const [address, setAddress] = useState<string>('서울시 마포구')
    const [candidateId, setCandidateId] = useState<string>('candidate_1')
    const [menuId, setMenuId] = useState<string>('menu_1')
    const [restaurantId, setRestaurantId] = useState<string>('rest_1')
    const [sortBy, setSortBy] = useState<
        'DIST' | 'POPULAR' | 'RATING' | 'PRICE' | 'OPEN_NOW'
    >('DIST')
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [categories, setCategories] = useState<string>('korean,japanese')
    const [priceLevels, setPriceLevels] = useState<string>('1,2')

    const addLog = (event: string, payload?: unknown) => {
        setLogs(prev => [
            ...prev,
            {
                id: `${Date.now()}_${Math.random()}`,
                time: now(),
                event,
                payload
            }
        ])
    }

    // Listen to all events for quick inspection
    useEffect(() => {
        if (!socket) return
        setIsConnected(!!socket && socket.connected)
        const anyHandler = (event: string, ...args: unknown[]) => {
            addLog(event, args?.length === 1 ? args[0] : args)
        }

        socket.onAny(anyHandler)
        return () => {
            socket.offAny(anyHandler)
        }
    }, [socket])

    const emit = (event: string, payload?: unknown) => {
        if (!socket) return addLog('ERROR', 'socket not ready')
        addLog(`emit:${event}`, payload)
        socket.emit(event, payload)
    }

    // Handlers
    const sendChat = () => emit('chat-message', { text: chatText })
    const requestPhaseChange = () =>
        emit('request-phase-change', { to: Number(phaseTo) })
    const updatePhaseData = () => {
        let parsed: unknown = {}
        try {
            parsed = JSON.parse(phaseDataJson || '{}')
        } catch (e) {
            addLog('ERROR', 'Invalid JSON for phase data')
            return
        }
        emit('update-phase-data', {
            phase: Number(phaseDataPhase),
            data: parsed
        })
    }
    const toggleReady = () => emit('ready-state', { isReady: !isReady })
    const addCandidate = () =>
        emit('add-location-candidate', {
            place: { placeName, lat: Number(lat), lng: Number(lng), address }
        })
    const voteLocation = () => emit('vote-location', { candidateId, roomId })
    const removeLocation = () =>
        emit('remove-location', { candidateId, roomId })
    const excludeMenu = () => emit('exclude-menu', { itemId: menuId, roomId })
    const pickMenu = () => emit('pick-menu', { menuId, roomId })
    const pickRestaurant = () =>
        emit('pick-restaurant', { restaurantId, roomId })
    const doSort = () => emit('sort-restaurants', { sortBy })
    const doFilter = () => {
        const cats = categories
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        const prices = priceLevels
            .split(',')
            .map(s => Number(s.trim()))
            .filter(n => !Number.isNaN(n))
        emit('filter-restaurants', { categories: cats, priceLevels: prices })
    }

    useEffect(() => {
        setIsReady(false)
    }, [])

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    소켓 테스트
                </h1>
                <p className="text-gray-600">
                    Gateway 이벤트 송수신 테스트 페이지
                </p>
            </div>

            {/* Connection info */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <div className="grid gap-2 text-sm text-gray-800 sm:grid-cols-2">
                    <div>연결상태: {isConnected ? '연결됨' : '연결안됨'}</div>
                    <div>Socket ID: {socket?.id || '-'}</div>
                    <div>Room ID: {roomId || '-'}</div>
                    <div>
                        사용자: {username || '-'} ({userId || '-'})
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
                {/* Chat */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">채팅</h3>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                            value={chatText}
                            onChange={e => setChatText(e.target.value)}
                            placeholder="메시지"
                        />
                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                            onClick={sendChat}
                            disabled={!isConnected}>
                            보내기
                        </button>
                    </div>
                </section>

                {/* Phase Change */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        단계 이동
                    </h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            max={5}
                            className="w-24 rounded-lg border border-gray-300 px-3 py-2"
                            value={phaseTo}
                            onChange={e => setPhaseTo(Number(e.target.value))}
                        />
                        <button
                            className="rounded-lg bg-purple-600 px-4 py-2 text-white"
                            onClick={requestPhaseChange}
                            disabled={!isConnected}>
                            이동 요청
                        </button>
                    </div>
                </section>

                {/* Phase Data Update */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        단계 데이터 업데이트
                    </h3>
                    <div className="mb-2 flex items-center gap-2">
                        <label className="text-sm text-gray-700">phase</label>
                        <input
                            type="number"
                            min={1}
                            max={5}
                            className="w-24 rounded-lg border border-gray-300 px-3 py-2"
                            value={phaseDataPhase}
                            onChange={e =>
                                setPhaseDataPhase(Number(e.target.value))
                            }
                        />
                    </div>
                    <textarea
                        className="h-24 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
                        value={phaseDataJson}
                        onChange={e => setPhaseDataJson(e.target.value)}
                        placeholder={`{\n  "key": "value"\n}`}
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                            onClick={updatePhaseData}
                            disabled={!isConnected}>
                            업데이트
                        </button>
                    </div>
                </section>

                {/* Waiting room ready */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        대기실 준비 상태
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700">
                            isReady: {String(isReady)}
                        </span>
                        <button
                            className="rounded-lg bg-teal-600 px-4 py-2 text-white"
                            onClick={() => {
                                toggleReady()
                                setIsReady(prev => !prev)
                            }}
                            disabled={!isConnected}>
                            토글
                        </button>
                    </div>
                </section>

                {/* Step 2: Location candidate */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        장소 후보
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <input
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            value={placeName}
                            onChange={e => setPlaceName(e.target.value)}
                            placeholder="placeName"
                        />
                        <input
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="address"
                        />
                        <input
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            type="number"
                            value={lat}
                            onChange={e => setLat(Number(e.target.value))}
                            placeholder="lat"
                        />
                        <input
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            type="number"
                            value={lng}
                            onChange={e => setLng(Number(e.target.value))}
                            placeholder="lng"
                        />
                    </div>
                    <div className="mt-2 flex gap-2">
                        <button
                            className="rounded-lg bg-green-600 px-4 py-2 text-white"
                            onClick={addCandidate}
                            disabled={!isConnected}>
                            추가
                        </button>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <input
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            value={candidateId}
                            onChange={e => setCandidateId(e.target.value)}
                            placeholder="candidateId"
                        />
                        <div className="flex gap-2">
                            <button
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white"
                                onClick={voteLocation}
                                disabled={!isConnected}>
                                투표
                            </button>
                            <button
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white"
                                onClick={removeLocation}
                                disabled={!isConnected}>
                                제거
                            </button>
                        </div>
                    </div>
                </section>

                {/* Step 3: Exclude menu */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        메뉴 제외
                    </h3>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                            value={menuId}
                            onChange={e => setMenuId(e.target.value)}
                            placeholder="itemId/menuId"
                        />
                        <button
                            className="rounded-lg bg-gray-700 px-4 py-2 text-white"
                            onClick={excludeMenu}
                            disabled={!isConnected}>
                            제외
                        </button>
                    </div>
                </section>

                {/* Step 4: Pick menu */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        메뉴 선택
                    </h3>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                            value={menuId}
                            onChange={e => setMenuId(e.target.value)}
                            placeholder="menuId"
                        />
                        <button
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
                            onClick={pickMenu}
                            disabled={!isConnected}>
                            선택
                        </button>
                    </div>
                </section>

                {/* Step 5: Pick restaurant */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        최종 식당 선택
                    </h3>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                            value={restaurantId}
                            onChange={e => setRestaurantId(e.target.value)}
                            placeholder="restaurantId"
                        />
                        <button
                            className="rounded-lg bg-rose-600 px-4 py-2 text-white"
                            onClick={pickRestaurant}
                            disabled={!isConnected}>
                            선택
                        </button>
                    </div>
                </section>

                {/* Sort & Filter */}
                <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        정렬 / 필터
                    </h3>
                    <div className="mb-3 flex items-center gap-2">
                        <label className="text-sm text-gray-700">sortBy</label>
                        <select
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            value={sortBy}
                            onChange={e =>
                                setSortBy(e.target.value as typeof sortBy)
                            }>
                            <option value="DIST">DIST</option>
                            <option value="POPULAR">POPULAR</option>
                            <option value="RATING">RATING</option>
                            <option value="PRICE">PRICE</option>
                            <option value="OPEN_NOW">OPEN_NOW</option>
                        </select>
                        <button
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                            onClick={doSort}
                            disabled={!isConnected}>
                            정렬 적용
                        </button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <input
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            value={categories}
                            onChange={e => setCategories(e.target.value)}
                            placeholder="categories: comma separated"
                        />
                        <input
                            className="rounded-lg border border-gray-300 px-3 py-2"
                            value={priceLevels}
                            onChange={e => setPriceLevels(e.target.value)}
                            placeholder="priceLevels: e.g. 1,2,3"
                        />
                    </div>
                    <div className="mt-2 flex justify-end">
                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                            onClick={doFilter}
                            disabled={!isConnected}>
                            필터 적용
                        </button>
                    </div>
                </section>
            </div>

            {/* Logs */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                        이벤트 로그 ({logs.length})
                    </h3>
                    <button
                        className="text-sm text-gray-600 hover:text-gray-800"
                        onClick={() => setLogs([])}>
                        지우기
                    </button>
                </div>
                <div className="max-h-80 space-y-2 overflow-auto">
                    {logs.length === 0 ? (
                        <p className="py-4 text-center text-gray-500">
                            로그가 없습니다.
                        </p>
                    ) : (
                        logs.map(l => (
                            <div
                                key={l.id}
                                className="rounded border border-gray-200 p-2">
                                <div className="mb-1 text-xs text-gray-500">
                                    {l.time}
                                </div>
                                <div className="font-mono text-sm text-gray-900">
                                    {l.event}
                                </div>
                                {l.payload !== undefined && (
                                    <pre className="mt-1 overflow-auto rounded bg-gray-50 p-2 text-xs text-gray-800">
                                        {JSON.stringify(l.payload, null, 2)}
                                    </pre>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
