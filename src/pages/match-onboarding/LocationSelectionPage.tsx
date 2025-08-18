import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSocket } from '@/contexts/SocketContext'
import { OnboardingHeader, SearchLocationInput, KakaoMap } from '@/components'

interface LocationCandidateDto {
    placeName: string
    lat: number
    lng: number
    address?: string
}

export enum ClientAction {
    // 단계 제어
    STAGE_MOVE = 'STAGE_MOVE',
    STAGE_LOCK = 'STAGE_LOCK',

    // 2단계 - 장소 후보
    CANDIDATE_ADD = 'CANDIDATE_ADD',
    CANDIDATE_REMOVE = 'CANDIDATE_REMOVE',
    CANDIDATE_VOTE = 'CANDIDATE_VOTE',
    CANDIDATE_UNVOTE = 'CANDIDATE_UNVOTE',
    CANDIDATE_SELECT = 'CANDIDATE_SELECT',
    CANDIDATE_UNSELECT = 'CANDIDATE_UNSELECT',

    // 3단계 - 메뉴 제외
    EXCLUDE_MENU_ADD = 'EXCLUDE_MENU_ADD',
    EXCLUDE_MENU_REMOVE = 'EXCLUDE_MENU_REMOVE',

    // 4단계 - 메뉴 선택
    MENU_PICK = 'MENU_PICK',
    MENU_UNPICK = 'MENU_UNPICK',

    // 5단계 - 최종 식당 선택
    RESTAURANT_PICK = 'RESTAURANT_PICK',
    RESTAURANT_UNPICK = 'RESTAURANT_UNPOVE',

    // 채팅
    CHAT_SEND = 'CHAT_SEND'
}

interface LocationOption extends LocationCandidateDto {
    id: string
    isSelected: boolean
}

export function LocationSelectionPage() {
    const navigate = useNavigate()
    const { socket, roomId, userId, username } = useSocket()

    const [selectedLocation, setSelectedLocation] = useState<string | null>(
        null
    )
    const [isSearching, setIsSearching] = useState(false)
    const [locationOptions, setLocationOptions] = useState<LocationOption[]>([])
    const mapRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        socket?.on('location-candidate-added', (data: any) => {
            setLocationOptions(data)
            data.forEach((location: any) => {
                console.log(location, mapRef.current)
                const latlng = new window.kakao.maps.LatLng(
                    location.lat,
                    location.lng
                )
                const marker = new window.kakao.maps.Marker({
                    position: latlng
                })
                marker.setMap(mapRef.current)
            })
        })
    }, [])

    const handleLocationSelect = (locationId: string) => {
        // setLocationOptions(prev =>
        //     prev.map(location =>
        //         location.id === locationId
        //             ? { ...location, isSelected: !location.isSelected }
        //             : location
        //     )
        // )
        // setSelectedLocation(locationId)
        // socket?.emit('add-location-candidate', {
        //     candidateId: locationId
        // })
    }

    const handleMapLocationSelect = async (
        lat: number,
        lng: number,
        address: string
    ) => {
        // 새로운 위치 옵션 추가
        const newLocation: LocationOption = {
            id: Date.now().toString(),
            placeName: `새로운 위치 (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
            address: address,
            isSelected: true,
            lat,
            lng
        }

        // 서버에 위치 데이터 전송
        try {
            const locationData: LocationCandidateDto = {
                lat,
                lng,
                placeName: newLocation.placeName,
                address: newLocation.address
            }

            socket?.emit('add-location-candidate', locationData)
            // await locationApi.sendLocationSelection(locationData)
            console.log('위치 데이터가 서버에 전송되었습니다:', locationData)
        } catch (error) {
            console.error('위치 데이터 전송 실패:', error)
        }
    }

    const handleSearch = async (searchKeyword: string) => {
        if (searchKeyword.trim()) {
            setIsSearching(true)
            try {
                var ps = new window.kakao.maps.services.Places()
                ps.keywordSearch(
                    searchKeyword,
                    (data: any, status: any, pagination: any) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            console.log(data)
                        }
                    },
                    { category_group_code: 'FD6' }
                )
                // const searchResults =
                // await locationApi.searchLocations(searchQuery)
                // console.log('검색 결과:', searchResults)

                // 검색 결과를 위치 옵션에 추가
                // const newLocations: LocationOption[] = searchResults.map(
                //     (result: any, index: number) => ({
                //         id: `search-${Date.now()}-${index}`,
                //         placeName: result.name || result.place_name,
                //         address: result.address || result.road_address_name,
                //         isSelected: false,
                //         lat: result.lat || result.y,
                //         lng: result.lng || result.x
                //     }),
                //     { useMapBounds: true }
                // )

                // setLocationOptions(prev => [...prev, ...newLocations])
            } catch (error) {
                console.error('위치 검색 실패:', error)
            } finally {
                setIsSearching(false)
            }
        }
    }

    return (
        <div className="min-h-screen">
            <OnboardingHeader
                tags={['가은', '최강']}
                title="만날 장소를 정해보아요."
                description="지도에 위치를 클릭하거나, 장소 검색을 통해 장소를 추가 할 수 있어요. 
                장소 추가 후 투표해보아요! "
                progress={1}
                voteLimit="1인 최대 2개 추가"
            />

            {/* Map */}
            <div className="relative">
                <div
                    className="pointer-events-none absolute left-0 z-200 -ml-20 h-full w-screen select-none"
                    style={{
                        boxShadow:
                            '0 -4px 14px 0 rgba(0, 0, 0, 0.10) inset, 0 4px 14px 0 rgba(0, 0, 0, 0.10) inset'
                    }}></div>
                <SearchLocationInput handleSearch={handleSearch} />
                <KakaoMap
                    ref={mapRef}
                    onLocationSelect={handleMapLocationSelect}
                    height="300px"></KakaoMap>
            </div>

            {/* Location Options */}
            <div className="space-y-3 px-4 py-2">
                {locationOptions.map(location => (
                    <div
                        key={location.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                            location.isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        onClick={() => handleLocationSelect(location.id)}>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                    {location.placeName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {location.address}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${
                                        location.isSelected
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-gray-300'
                                    }`}>
                                    {location.isSelected && (
                                        <div className="h-2 w-2 rounded-sm bg-white"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Separator */}
            <div className="px-4 py-4">
                <div className="h-px w-full bg-gray-200"></div>
            </div>
        </div>
    )
}
