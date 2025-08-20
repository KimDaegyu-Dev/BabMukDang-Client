export function Filter({
    filter,
    onClick,
    activeFilter
}: {
    filter: { key: string; label: string }
    onClick: () => void
    activeFilter: { key: string; label: string }
}) {
    return (
        <div
            className={`flex cursor-pointer flex-row gap-10 rounded-full px-12 py-6 ${filter.key === activeFilter.key ? 'border-primary-main border bg-white' : 'bg-gray-2'}`}
            onClick={onClick}>
            <span
                className={`text-body2-semibold ${filter.key === activeFilter.key ? 'text-primary-main' : 'text-gray-4'}`}>
                {filter.label}
            </span>
        </div>
    )
}
