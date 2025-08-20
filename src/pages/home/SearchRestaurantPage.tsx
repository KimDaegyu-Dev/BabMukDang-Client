import exifr from 'exifr'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useImageStore } from '@/store'
import { RestaurantCard, MutalButton, SearchInput } from '@/components'
import { useBottomNav } from '@/hooks'

export function SearchRestaurantPage() {
    const { image } = useImageStore()
    const gps = useRef<any>(null)
    const [restaurants, setRestaurants] = useState<any[]>([])
    const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
    const getGps = async () => {
        try {
            const result = await exifr.parse(image as File, { gps: true })
            gps.current = result
            if (result.latitude && result.longitude) {
                places.current = new window.kakao.maps.services.Places()
                places.current.categorySearch(
                    'FD6',
                    (data: any, status: any, pagination: any) => {
                        setRestaurants(data)
                    },
                    {
                        x: result.longitude,
                        y: result.latitude,
                        radius: 1000,
                        sort: window.kakao.maps.services.SortBy.DISTANCE
                    }
                )
            }
        } catch (err) {
            console.error('EXIF parsing error:', err)
        }
    }

    const places = useRef<any>(null)
    useEffect(() => {
        if (!image) return
        getGps()
    }, [image])

    const handleSearch = (searchKeyword: string) => {
        if (!searchKeyword) {
            if (gps.current?.longitude && gps.current?.latitude) {
                getGps()
            } else {
                return
            }
        }
        places.current = new window.kakao.maps.services.Places()
        places.current.keywordSearch(
            searchKeyword,
            (data: any, status: any, pagination: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setRestaurants(data)
                } else if (
                    status === window.kakao.maps.services.Status.ZERO_RESULT
                ) {
                    setRestaurants([])
                }
            },
            {
                category_group_code: 'FD6',
                x: gps.current?.longitude ? gps.current?.longitude : null,
                y: gps.current?.latitude ? gps.current?.latitude : null,
                sort:
                    gps.current?.longitude && gps.current?.latitude
                        ? window.kakao.maps.services.SortBy.DISTANCE
                        : null
            }
        )
    }
    const handleSelectRestaurant = (restaurant: any) => {
        setSelectedRestaurant(restaurant)
    }

    const { showBottomNav, hideBottomNav } = useBottomNav()
    useEffect(() => {
        hideBottomNav()
        return () => {
            showBottomNav()
        }
    }, [])
    return (
        <div className="relative flex h-full w-full flex-col overflow-y-auto pt-16">
            <div className="fixed top-66 left-0 w-full px-20">
                <SearchInput
                    handleSearch={handleSearch}
                    placeholder="음식점 이름을 검색해 주세요."
                />
            </div>
            {/* 검색 결과 */}
            <div className="mt-53 flex flex-col items-center gap-10">
                {restaurants.map(restaurant => (
                    <RestaurantCard
                        restaurant={restaurant}
                        gps={gps}
                        onClick={() => handleSelectRestaurant(restaurant)}
                        className={`${
                            selectedRestaurant?.id === restaurant.id
                                ? 'bg-primary-100 border-primary-main border-1'
                                : 'bg-white'
                        }`}
                    />
                ))}
            </div>
            <div className="fixed bottom-40 left-0 w-full px-20">
                <UploadButton disabled={false} />
            </div>
        </div>
    )
}

function UploadButton({ disabled }: { disabled?: boolean }) {
    const handleJoin = () => {
        if (disabled) return
    }

    return (
        <Link
            className="w-full"
            replace
            to="/">
            <MutalButton
                text="게시물 업로드 하기"
                onClick={handleJoin}
                hasArrow={true}
            />
        </Link>
    )
}
