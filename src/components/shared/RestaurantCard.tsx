import { CallIcon, LocationGrayIcon, ShareIcon } from '@/assets/icons'
import { useAuthStore } from '@/store'
import { FriendProfileList } from '../features/onboarding'
import { Link } from 'react-router-dom'
import { COLORS } from '@/constants/colors'
// import { Restaurant } from '@/types/restaurant'

interface Restaurant {
    id: string
    place_name: string
    category_name: string
    category_group_name: string
    distance: string
    road_address_name: string
    address_name: string
    phone: string
    selectUsers: string[]
    place_url?: string
}
interface RestaurantCardProps {
    restaurant: Restaurant
    gps?: any
    onClick: (restaurant: Restaurant) => void
    className?: string
}

export function RestaurantCard({
    restaurant,
    onClick,
    className = '',
    gps
}: RestaurantCardProps) {
    const { userId } = useAuthStore()
    return (
        <div
            className={`shadow-drop-1 flex w-full justify-between rounded-lg p-12 ${className} ${restaurant?.selectUsers?.includes(userId!) ? 'border-primary-main bg-primary-100 border' : 'bg-white'}`}
            onClick={() => onClick(restaurant)}>
            <div className="flex flex-col gap-11">
                {/* 레스토랑 이름과 카테고리 */}
                <div className="flex items-center gap-8">
                    <span className="text-body1-bold text-black">
                        {restaurant.place_name}
                    </span>
                    <span className="text-caption-medium text-gray-3">
                        {restaurant.category_name?.split(' > ').pop() ||
                            restaurant.category_group_name}
                    </span>
                </div>

                {/* 위치와 전화번호 정보 */}
                <div className="flex flex-col items-baseline gap-6">
                    {/* 위치 정보 */}
                    <div className="flex items-center gap-3">
                        <LocationGrayIcon />
                        {gps?.current?.latitude && gps?.current?.longitude && (
                            <span className="text-caption-medium text-gray-5">
                                {formatDistance(restaurant.distance)}{' '}
                            </span>
                        )}
                        {restaurant?.distance && (
                            <span className="text-caption-medium text-gray-5">
                                {formatDistance(restaurant.distance)}{' '}
                            </span>
                        )}
                        <span className="text-caption-medium text-gray-5">
                            {restaurant.road_address_name ||
                                restaurant.address_name}
                        </span>
                    </div>

                    {/* 전화번호 */}
                    {restaurant.phone && (
                        <div className="flex items-center gap-2">
                            <CallIcon />
                            <span className="text-caption-medium text-gray-5">
                                {restaurant.phone}
                            </span>
                        </div>
                    )}
                    {/* 링크 */}
                    {restaurant.place_url && (
                        <Link
                            to={restaurant.place_url}
                            target="_blank"
                            className="flex items-center gap-2">
                            <ShareIcon
                                strokecolor={COLORS.gray5}
                                className="size-16"
                            />
                            <span className="text-caption-medium text-gray-5">
                                식당 정보 보러가기
                            </span>
                        </Link>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <FriendProfileList
                    selectedUsers={restaurant.selectUsers || []}
                />
            </div>
        </div>
    )
}

// 거리를 미터 단위로 포맷팅하는 함수
const formatDistance = (distance: string) => {
    const dist = parseInt(distance)
    if (dist < 1000) {
        return `${dist}m`
    } else {
        return `${(dist / 1000).toFixed(1)}km`
    }
}
