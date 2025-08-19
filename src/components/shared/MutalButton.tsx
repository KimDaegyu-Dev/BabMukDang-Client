import { BackIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'

export function MutalButton({
    text,
    className,
    onClick,
    hasArrow = false
}: {
    text: string
    className?: string
    onClick?: () => void
    hasArrow?: boolean
}) {
    return (
        <button
            className={`bg-gray-7 flex w-full cursor-pointer items-center justify-center rounded-full py-14 pr-16 pl-17 ${className} `}
            onClick={onClick}
            onTouchEnd={onClick}>
            <span className="text-title2-semibold text-white">{text}</span>
            {hasArrow && (
                <BackIcon
                    className="rotate-180"
                    strokecolor={COLORS.gray1}
                />
            )}
        </button>
    )
}

export function MutalButtonSmall({
    text,
    className,
    onClick
}: {
    text: string
    className?: string
    onClick?: () => void
}) {
    return (
        <button
            className={`bg-gray-7 flex w-full cursor-pointer items-center justify-center rounded-full py-10 ${className} `}
            onClick={onClick}
            onTouchEnd={onClick}>
            <span className="text-body1-semibold text-white">{text}</span>
        </button>
    )
}
