import { cn } from '@/lib/utils'
export function TagPerson({
    name,
    orange = false,
    className
}: {
    name: string
    orange?: boolean
    className?: string
}) {
    return (
        <div
            className={cn(
                'box-border rounded-full px-6 py-5',
                className,
                orange ? 'bg-primary-200' : 'bg-white'
            )}
            style={{
                // @ts-expect-error: Non-standard CSS property used for text-box trimming support
                textBox: 'trim-both cap alphabetic'
            }}>
            <span className="text-caption-medium text-gray-700">@{name}</span>
        </div>
    )
}
