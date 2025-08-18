export function ModalTrigger({
    forId,
    children,
    className,
    disabled
}: {
    forId?: string
    children: React.ReactNode
    className?: string
    disabled?: boolean
}) {
    return (
        <div
            className={className}
            popoverTarget={forId ?? 'notify-popover'}
            popoverTargetAction="show"
            onClick={() => {
                if (disabled) return
                document
                    .getElementById(forId ?? 'notify-popover')
                    ?.showPopover?.()
            }}
            onTouchEnd={() => {
                if (disabled) return
                document
                    .getElementById(forId ?? 'notify-popover')
                    ?.showPopover?.()
            }}>
            {children}
        </div>
    )
}
