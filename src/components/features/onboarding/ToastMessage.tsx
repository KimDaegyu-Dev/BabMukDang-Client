import { useEffect, useState } from 'react'
import { useSocket } from '../../../contexts/SocketContext'

type ToastMessageProps = {
    isOpen: boolean
    message: string
    onClose?: () => void
    durationMs?: number
}

export function ToastMessage() {
    const { finalState } = useSocket()
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (!isOpen) return

        const durationMs = 3000
        const timer = setTimeout(() => {
            setIsOpen(false)
        }, durationMs)

        return () => clearTimeout(timer)
    }, [isOpen])

    useEffect(() => {
        if (finalState) {
            setMessage('다음 단계로 이동했어요')
            setIsOpen(true)
        }
    }, [finalState])
    return (
        <div
            className={`fixed bottom-114 left-1/2 z-50 w-full -translate-x-1/2 transform px-20 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}>
            <div className="text-14 rounded-12 flex items-center justify-center bg-black/80 px-16 py-21 text-center text-white shadow-lg">
                {message}
            </div>
        </div>
    )
}
