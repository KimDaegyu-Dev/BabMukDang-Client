import { cn } from '@/lib'
import { Filter } from './Filter'

export function FilterList({
    filterList,
    activeFilter,
    setActiveFilter,
    className
}: {
    filterList: { key: string; label: string }[]
    activeFilter: { key: string; label: string }
    setActiveFilter: (f: { key: string; label: string }) => void
    className?: string
}) {
    return (
        <div className={cn('flex gap-10', className)}>
            {filterList.map((filter, index) => (
                <Filter
                    key={index}
                    filter={filter}
                    activeFilter={activeFilter}
                    onClick={() => setActiveFilter(filter)}
                />
            ))}
        </div>
    )
}
