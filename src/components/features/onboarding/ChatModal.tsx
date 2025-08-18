import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
    CommentIcon,
    DeleteIcon,
    DeleteCircleIcon,
    SendIcon
} from '@/assets/icons'
import { COLORS } from '@/constants/colors'
import { useSocket } from '@/contexts/SocketContext'
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

interface ChatModalProps {
    isOpen: boolean
    onClose: () => void
    roomId?: string
}

export function ChatModal({
    isOpen,
    onClose,
    roomId = 'default-room'
}: ChatModalProps) {
    const { socket, chatMessages, userId } = useSocket()
    const [messages, setMessages] = useState<ChatMessageDto[]>(
        chatMessages || []
    )
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const inputRef = useCallback(
        (node: HTMLInputElement | null) => {
            if (node && isOpen) {
                node.focus()
                scrollToBottom(false)
            }
        },
        [isOpen]
    )

    // 메시지 전송
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: ChatMessageDto = {
                messageId: Date.now().toString(),
                roomId: roomId,
                user: {
                    userId: userId,
                    username: '나'
                },
                text: newMessage.trim(),
                createdAt: new Date().toISOString()
            }
            setMessages(prev => [...prev, message])
            setNewMessage('')
            socket?.emit('chat-message', message)
        }
    }

    // Enter 키로 메시지 전송
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // 스크롤을 맨 아래로
    const scrollToBottom = (isSmooth: boolean = true) => {
        messagesEndRef.current?.scrollIntoView({
            behavior: isSmooth ? 'smooth' : 'auto'
        })
    }
    useEffect(() => {
        socket?.on('chat-message', message => {
            setMessages(prev => [...prev, message])
        })
        socket?.on('chat-messages', messages => {
            setMessages(messages)
        })
    }, [socket])
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    if (!isOpen) return null

    return (
        <div className="chat-overlay bg-opacity-40 fixed inset-0 z-1000 flex items-end justify-center bg-black/20">
            <div className="chat-sheet shadow-drop-1 rounded-t-16 relative flex h-[80vh] w-full flex-col">
                <ChatHeader onClose={onClose} />
                {/* 메시지 영역 */}
                <div className="bg-primary-200 flex flex-1 flex-col gap-20 overflow-y-auto px-20 pt-30 pb-80">
                    {messages.map(message =>
                        message.user.userId === userId ? (
                            <ChatMessageMy message={message} />
                        ) : (
                            <ChatMessageOther message={message} />
                        )
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 입력 영역 */}
                <ChatInput
                    inputRef={inputRef}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleKeyPress={handleKeyPress}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

const ChatInput = ({
    inputRef,
    newMessage,
    setNewMessage,
    handleKeyPress,
    handleSendMessage
}: {
    inputRef: (node: HTMLInputElement | null) => void
    newMessage: string
    setNewMessage: (value: string) => void
    handleKeyPress: (e: React.KeyboardEvent) => void
    handleSendMessage: () => void
}) => {
    return (
        <div className="absolute right-0 bottom-40 left-0 px-20">
            <div className="shadow-drop-1 flex w-full items-center justify-between rounded-full bg-white px-16 py-8">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="메시지를 입력해 주세요."
                    className="text-body1-medium text-gray-7 placeholder:text-gray-3 flex-1 bg-transparent focus:outline-none"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                {/* 스크롤된 상태로 채팅창 표시 */}
                <div className="flex items-center gap-10">
                    {newMessage && (
                        <button
                            onClick={() => setNewMessage('')}
                            className="flex h-13 w-13 items-center justify-center">
                            <DeleteCircleIcon />
                        </button>
                    )}
                    <div
                        className="flex h-20 w-20 items-center justify-center"
                        onClick={() => handleSendMessage()}>
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
const ChatHeader = ({ onClose }: { onClose: () => void }) => {
    return (
        <div>
            {/* 헤더 */}
            <div className="rounded-t-16 flex items-center justify-center bg-white px-20 py-12">
                <div>
                    <h2 className="text-body1-semibold text-black">
                        그룹 채팅
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="absolute right-20"
                    aria-label="채팅창 닫기">
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}
const ChatMessageMy = ({ message }: { message: ChatMessageDto }) => {
    return (
        <div className={`flex justify-end`}>
            <div
                className={`shadow-drop-1 bg-primary-400 rounded-12 w-fit px-16 py-12`}>
                <span className="text-body2-medium break-words whitespace-pre-line text-black">
                    {message.text}
                </span>
            </div>
        </div>
    )
}
const ChatMessageOther = ({ message }: { message: ChatMessageDto }) => {
    return (
        <div className={`flex flex-col justify-start gap-12`}>
            <div className="text-caption-medium text-gray-5 mb-1">
                {message.user.username}
            </div>
            <div
                className={`shadow-drop-1 rounded-12 w-fit bg-white px-16 py-12`}>
                <span className="text-body2-medium break-words whitespace-pre-line text-black">
                    {message.text}
                </span>
            </div>
        </div>
    )
}
// 채팅 버튼 컴포넌트
interface ChatButtonProps {
    onClick: () => void
    className?: string
    isOpen: boolean
}

export function ChatButton({
    onClick,
    className = '',
    isOpen
}: ChatButtonProps) {
    // const { socket, userId } = useSocket()
    // const [unreadCount, setUnreadCount] = useState(0)
    // useEffect(() => {
    //     const handleChatMessage = (message: ChatMessageDto) => {
    //         console.log(message.user.userId !== userId, isOpen)
    //         if (message.user.userId !== userId && !isOpen) {
    //             setUnreadCount(prev => prev + 1)
    //         }
    //     }
    //     socket?.on('chat-message', handleChatMessage)
    //     return () => {
    //         socket?.off('chat-message', handleChatMessage)
    //     }
    // }, [])
    // useEffect(() => {
    //     console.log('isOpen', isOpen)
    //     if (isOpen) {
    //         setUnreadCount(0)
    //     }
    // }, [isOpen])
    return (
        <>
            {/* {unreadCount > 0 && !isOpen && (
                <div className="text-caption-medium absolute -top-1 -right-1 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
                    {unreadCount}
                </div>
            )} */}
            <button
                onClick={() => {
                    onClick()
                    console.log('clicked', isOpen)
                }}
                className={`shadow-drop-1 border-primary-400 flex items-center justify-center rounded-full border bg-white p-18 ${className}`}
                aria-label="채팅 열기">
                <CommentIcon
                    bgcolor={COLORS.primaryMain}
                    strokecolor={COLORS.primary900}
                />
            </button>
        </>
    )
}
