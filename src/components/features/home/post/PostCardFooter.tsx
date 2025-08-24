import { LocationGrayIcon } from '@/assets/icons'
type RestaurantInfo = {
    placeId: string
    placeName: string
    addressName: string
    roadAddressName: string
    phoneNumber: string
    placeUrl?: string
    distance?: string
    categoryGroupCode: string
    categoryGroupName: string
    categoryName: string
    x: number
    y: number
}
export const PostCardFooter = ({
    restaurantInfo
}: {
    restaurantInfo: RestaurantInfo | null
}) => {
    return (
        <div className="shadow-drop-1 rounded-12 flex h-72 w-full flex-row items-center gap-12 bg-white">
            {/* Left: Restaurant Image */}
            <img
                src={restaurantInfo?.placeUrl || ''}
                alt="restaurant"
                className="rounded-l-12 h-72 w-72 object-cover"
            />
            {/* Center: Info */}
            <div className="flex w-188 flex-col justify-center gap-6">
                <div className="flex flex-row items-center gap-8">
                    <span className="text-body1-bold">
                        {restaurantInfo?.placeName}
                    </span>
                    <span className="text-caption-medium text-gray-3">
                        {restaurantInfo?.categoryGroupName}
                    </span>
                </div>
                <div className="flex w-full flex-row items-center gap-6">
                    {/* Location icon and distance */}
                    <div className="flex flex-row items-end gap-4">
                        <span className="flex items-center">
                            <LocationGrayIcon className="size-16" />
                        </span>
                        <span className="text-caption-medium text-gray-5">
                            {restaurantInfo?.distance}
                        </span>
                    </div>
                    <span className="text-caption-medium text-gray-6">
                        {restaurantInfo?.roadAddressName}
                    </span>
                </div>
            </div>
        </div>
    )
}
