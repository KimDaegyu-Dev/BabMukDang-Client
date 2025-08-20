import { ModifyIcon } from '@/assets/icons'

export function LocationCadidateItem({
    location,
    handleLocationSelect
}: {
    location: any
    handleLocationSelect: (id: string) => void
}) {
    return (
        <div
            className={`rounded-12 cursor-pointer p-16 transition-colors ${
                location.isSelected ? 'bg-primary-main' : 'bg-white'
            }`}
            onClick={() => handleLocationSelect(location.id)}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-body1-medium text-black">
                        {location.placeName}
                    </h3>
                    <p className="text-caption-10 text-gray-500">
                        {location.address}
                    </p>
                </div>
                <div className="flex items-center">
                    <ModifyIcon />
                </div>
            </div>
        </div>
    )
}
