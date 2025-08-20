export function GoodBadChip({
    text,
    isGood
}: {
    text: string
    isGood: boolean
}) {
    return (
        <span
            className={`text-caption-10 ${isGood ? 'text-primary-500 bg-primary-200' : 'text-gray-4 bg-gray-2'} rounded-full border px-8 py-3`}>
            {text}
        </span>
    )
}
