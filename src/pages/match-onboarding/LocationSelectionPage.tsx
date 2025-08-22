import { useState, useEffect, useRef } from 'react'

import { useSocket } from '@/contexts/SocketContext'
import { OnboardingHeader, KakaoMap, LocationCadidateItem } from '@/components'

interface LocationCandidateDto {
    placeName: string
    lat: number
    lng: number
    address?: string
}

interface LocationOption extends LocationCandidateDto {
    id: string
    isSelected: boolean
}

export function LocationSelectionPage() {
    const { socket, initialState, matchType } = useSocket()

    const [locationOptions, setLocationOptions] = useState<LocationOption[]>([])
    const mapRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (initialState && initialState.stage === 'location') {
            setLocationOptions(initialState.initialState.candidates)
        }
    }, [initialState])

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

    return (
        <div className="min-h-screen">
            <OnboardingHeader
                title={
                    matchType === 'announcement'
                        ? '만날 장소를 더 구체화 해봐요.'
                        : '만날 장소를 정해보아요.'
                }
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
                {/* <div className="absolute top-17 left-0 z-200 w-full">
                    <SearchInput
                        handleSearch={handleSearch}
                        placeholder="장소 검색하기"
                    />
                </div> */}
                <KakaoMap
                    ref={mapRef}
                    onLocationSelect={handleMapLocationSelect}
                    height="300px"></KakaoMap>
            </div>

            {/* Location Options */}
            <div className="mt-20 flex flex-col gap-13">
                {locationOptions.map(location => (
                    <LocationCadidateItem
                        key={location.id}
                        location={location}
                        onClick={() => handleLocationSelect(location.id)}
                    />
                ))}
            </div>
        </div>
    )
}
