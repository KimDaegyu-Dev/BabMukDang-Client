import { useRef, useState } from 'react'

import { OnboardingHeader, RestaurantCard } from '@/components'

export function RestaurantPage() {
    const gps = useRef<any>(null)
    const [restaurant, setRestaurant] = useState<any>({
        id: '1',
        place_name: '맛있는 연어집',
        category_name: '일식집',
        distance: '500m',
        road_address_name: '노원구 동이로 182길',
        address_name: '노원구 동이로 182길',
        phone: '02-970-2222'
    })
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                tags={['가은', '최강']}
                title="만남 장소 근처 맛집 중 골라보아요."
                progress={4}
                voteLimit="중복 투표"
            />
            <RestaurantCard
                restaurant={restaurant}
                gps={gps}
            />
        </div>
    )
}
