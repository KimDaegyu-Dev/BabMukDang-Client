interface ProgressBarProps {
    progress?: number // 0-100 사이의 값
    className?: string
}

export function ProgressBar({
    progress = 28,
    className = ''
}: ProgressBarProps) {
    return (
        <div className={`bg-gray-2 relative h-[3px] w-full ${className}`}>
            <div
                className="h-full bg-[#0163FF] transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
