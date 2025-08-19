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
    userId: string | null
    username: string | null
    chatMessages: ChatMessageDto[]
    initialState: any
    setInitialState: (initialState: any) => void
    categories: Category[]
} | null>(null)
export const useSocket = () => {
    const ctx = useContext(SocketContext)
    if (!ctx) throw new Error('useSocket must be used inside <SocketProvider>')
    return ctx
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null)
    const mounted = useRef(false)
    const { accessToken, setTokens, setUsername, setUserId } = useAuthStore()
    const { roomId } = useParams<{ roomId: string }>()
    const { matchType } = useParams<{
        matchType: 'announcement' | 'invitation'
    }>()
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const username = searchParams.get('username')
    const [chatMessages, setChatMessages] = useState<ChatMessageDto[]>([])
    const [initialState, setInitialState] = useState<any>(null)
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_CDN_URL}/categories.json`)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    // token이 설정된 후에 socket 생성
    useEffect(() => {
        // if (!token) return // token이 없으면 socket 생성하지 않음
        const s = io(`http://localhost:3000/${matchType}`, {
            query: { roomId: roomId || '' },
            auth: {
                token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzU1Mzg5MDU1LCJleHAiOjE3NTUzOTI2NTUsInVzZXJuYW1lIjoi6rmA64yA6recIiwiZW1haWwiOiI5dXRhbmdAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfTUVNQkVSIn0.vNIq2D3t1s95Mqz-zBJci51bRrM1GBF-0Wt0MKataCs'
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
    }, [socket])

    if (!socket) return null // 초기 연결 중 스켈레톤 UI를 보여줘도 됨
    return (
        <SocketContext.Provider
            value={{
                socket,
                roomId,
                userId,
                username,
                chatMessages,
                initialState,
                setInitialState,
                categories
            }}>
            {children}
        </SocketContext.Provider>
    )
}
