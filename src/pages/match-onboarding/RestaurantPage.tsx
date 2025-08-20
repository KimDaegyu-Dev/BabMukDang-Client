import { useEffect, useRef, useState } from 'react'

import { OnboardingHeader, RestaurantCard } from '@/components'
import { useSocket } from '@/contexts/SocketContext'

export function RestaurantPage() {
    const [restaurantList, setRestaurantList] = useState<any[]>([])
    const [restaurant, setRestaurant] = useState<any>({
        id: '1127477285',
        place_name: '맛있는 연어집',
        category_name: '일식집',
        distance: '500m',
        road_address_name: '노원구 동이로 182길',
        address_name: '노원구 동이로 182길',
        phone: '02-970-2222'
    })
    const { initialState } = useSocket()
    useEffect(() => {
        if (initialState && initialState.stage === 'restaurant') {
            setRestaurantList(initialState.initialState.restaurants[0])
        }
    }, [initialState])
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                title="만남 장소 근처 맛집 중 골라보아요."
                progress={4}
                voteLimit="중복 투표"
            />

            <div className="flex flex-col gap-10">
                {restaurantList.map((restaurant, index) => (
                    <RestaurantCard
                        key={index}
                        restaurant={restaurant}
                    />
                ))}
            </div>
        </div>
    )
}
