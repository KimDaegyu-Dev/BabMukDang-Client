import { useEffect } from 'react'

type ToastMessageProps = {
    isOpen: boolean
    message: string
    onClose?: () => void
    durationMs?: number
}

export function ToastMessage({
    isOpen,
    message,
    onClose,
    durationMs = 2000
}: ToastMessageProps) {
    useEffect(() => {
        if (!isOpen) return
        const timer = setTimeout(() => {
            onClose?.()
        }, durationMs)
        return () => clearTimeout(timer)
    }, [isOpen, durationMs, onClose])

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
