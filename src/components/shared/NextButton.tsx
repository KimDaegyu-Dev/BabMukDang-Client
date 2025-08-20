import { ArrowForwardIcon } from '@/assets/icons'
import { cn } from '@/lib/utils'

export function NextButton({
    onClick,
    className
}: {
    onClick: () => void
    className?: string
}) {
    return (
        <button
            type="button"
            className={cn(
                'rounded-30 bg-gray-7 fixed right-20 bottom-40 flex items-center gap-10 px-16 py-12',
                className
            )}
            onClick={onClick}>
            <span className="text-body1-semibold text-white">다음</span>
            <ArrowForwardIcon />
        </button>
    )
}
