export function TagPerson({
    name,
    orange = false
}: {
    name: string
    orange?: boolean
}) {
    return (
        <div
            className={`box-border rounded-full px-6 py-5 ${
                orange ? 'bg-primary-200' : 'bg-white'
            }`}
            style={{
                textBox: 'trim-both cap alphabetic'
            }}>
            <span className="text-caption-medium text-gray-700">@{name}</span>
        </div>
    )
}
