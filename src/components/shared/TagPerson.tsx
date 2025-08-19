export function TagPerson({
    name,
    orange = false
}: {
    name: string
    orange?: boolean
}) {
    return (
        <div
            className={`rounded-full px-6 py-3 ${
                orange ? 'bg-primary-200' : 'bg-white'
            }`}>
            <span className="text-caption-medium text-gray-700">@{name}</span>
        </div>
    )
}
