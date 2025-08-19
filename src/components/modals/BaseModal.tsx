import React, { useEffect, useRef } from 'react'

type PopoverElement = HTMLDivElement & {
    showPopover?: () => void
    hidePopover?: () => void
}

interface BaseModalProps {
    open?: boolean
    id?: string
    onClose?: () => void
    onAccept?: () => void
    children?: React.ReactElement<BaseModalChildrenProps>
}
export interface BaseModalChildrenProps {
    open?: boolean
    id?: string
    onClose?: () => void
    onAccept?: () => void
}

export function BaseModal({
    open,
    id = 'notify-popover',
    onClose,
    onAccept,
    children
}: BaseModalProps) {
    const popoverRef = useRef<PopoverElement | null>(null)

    useEffect(() => {
        const el = popoverRef.current
        if (!el) return
        if (open) {
            el.showPopover?.()
        } else {
            el.hidePopover?.()
        }
    }, [open])

    const handleClose = () => {
        console.log('handleClose')
        popoverRef.current?.hidePopover?.()
        onClose?.()
    }

    const handleAccept = () => {
        console.log('handleAccept')
        onAccept?.()
        popoverRef.current?.hidePopover?.()
    }

    return (
        <div
            id={id}
            ref={popoverRef}
            className="popover-overlay w-full bg-transparent px-35"
            popover="manual">
            {React.isValidElement(children) &&
                React.cloneElement(children, {
                    onClose: handleClose,
                    onAccept: handleAccept
                })}
        </div>
    )
}
