// SocketContext.tsx
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { useAuthStore } from '@/store/authStore'
import { useParams, useSearchParams } from 'react-router-dom'
import { useLogin } from '@/hooks/useLogin'

interface ChatMessageDto {
    messageId: string
    roomId: string
    user: {
        userId: string | null
        username: string
    }
    text?: string
    imageUrl?: string
    createdAt: string
}
type Category = {
    id: string
    name: string
    aspectRatio: number
    placeholder: { blurhash: string; thumbhashDataURL: string }
    images: {
        src: string
        avifSrcset: string
    }
    priority?: boolean
}
const SocketContext = createContext<{
    socket: Socket | null
    roomId: string | undefined
    chatMessages: ChatMessageDto[]
    initialState: any
    setInitialState: (initialState: any) => void
    categories: Category[]
    participants: any[]
    setParticipants: (participants: any[]) => void
    readyCount: number
    participantCount: number
    stage: string
    matchType: 'announcement' | 'invitation'
    setStage: (stage: string) => void
    setReadyCount: (readyCount: number) => void
    setParticipantCount: (participantCount: number) => void
    isSelfReady: boolean
    setIsSelfReady: (isSelfReady: boolean) => void
    finalState: any
    setFinalState: (finalState: any) => void
} | null>(null)
export const useSocket = () => {
    const ctx = useContext(SocketContext)
    if (!ctx) throw new Error('useSocket must be used inside <SocketProvider>')
    return ctx
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null)
    const mounted = useRef(false)
    const { accessToken } = useAuthStore()
    const { roomId } = useParams<{ roomId: string }>()
    const { matchType } = useParams<{
        matchType: 'announcement' | 'invitation'
    }>()
    const [chatMessages, setChatMessages] = useState<ChatMessageDto[]>([])
    const [initialState, setInitialState] = useState<any>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [participants, setParticipants] = useState<any[]>([])
    const [readyCount, setReadyCount] = useState(0)
    const [participantCount, setParticipantCount] = useState(0)
    const [stage, setStage] = useState('waiting')
    const [isSelfReady, setIsSelfReady] = useState(false)
    const [finalState, setFinalState] = useState<any>(null)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_CDN_URL}/categories.json`)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    // token이 설정된 후에 socket 생성
    useEffect(() => {
        if (!accessToken) return // token이 없으면 socket 생성하지 않음
        const s = io(`${import.meta.env.VITE_WEBSOCKET_URL}/${matchType}`, {
            query: { roomId: roomId || '' },
            auth: {
                token: accessToken
            }
        })

        setSocket(s)
        console.log('socket init', s)

        return () => {
            console.log('socket destroy')
            s.removeAllListeners()
            s.close()
        }
    }, [accessToken, roomId, matchType]) // token과 roomId가 변경될 때마다 재생성

    useEffect(() => {
        if (!socket) return
        socket.onAny((event, ...args) => {
            console.log(event, args)
        })
        socket?.on('ready-state-changed', (data: any) => {
            setReadyCount(data.readyCount)
            setParticipantCount(data.participantCount)
        })
        socket?.on('stage-changed', data => {
            setStage(data.stage)
            setIsSelfReady(false)
        })
    }, [socket])

    if (!socket) return null // 초기 연결 중 스켈레톤 UI를 보여줘도 됨
    return (
        <SocketContext.Provider
            value={{
                socket,
                roomId,
                chatMessages,
                initialState,
                setInitialState,
                categories,
                participants,
                setParticipants,
                readyCount,
                participantCount,
                stage,
                matchType: matchType as 'announcement' | 'invitation',
                setStage,
                setReadyCount,
                setParticipantCount,
                isSelfReady,
                setIsSelfReady,
                finalState,
                setFinalState
            }}>
            {children}
        </SocketContext.Provider>
    )
}
