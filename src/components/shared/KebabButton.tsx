import { useEffect, useRef, useState } from 'react'
import { KebabIcon } from '@/assets/icons'
import { cn } from '@/lib/utils'

export function KebabButton({
    onClick,
    className
}: {
    onClick: () => void
    className?: string
}) {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const menuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            const target = e.target as Node
            if (
                open &&
                !buttonRef.current?.contains(target) &&
                !menuRef.current?.contains(target)
            ) {
                setOpen(false)
            }
        }
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEsc)
        document.addEventListener('touchstart', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEsc)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [open])

    return (
        <div className={cn('relative inline-flex', className)}>
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
                onTouchStart={() => setOpen(v => !v)}
                className={`flex flex-row items-center justify-center`}>
                <KebabIcon />
            </button>

            {open && (
                <div
                    ref={menuRef}
                    role="menu"
                    className="shadow-drop-1 rounded-8 absolute top-full right-0 z-50 mt-8 flex-shrink-0 bg-white px-12 py-6"
                    onClick={onClick}>
                    <span className="text-body2-medium text-gray-7 text-nowrap">
                        삭제하기
                    </span>
                </div>
            )}
        </div>
    )
}
