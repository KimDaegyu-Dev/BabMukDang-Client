import { LocationVoteItem, OnboardingHeader } from '@/components'
import { useSocket } from '@/contexts/SocketContext'
import { useEffect, useState } from 'react'

export function LocationVotePage() {
    const { initialState, socket } = useSocket()
    const [locationCandidates, setLocationCandidates] = useState<any[]>([])
    const [selectedLocation, setSelectedLocation] = useState<any>(null)
    useEffect(() => {
        if (initialState && initialState.stage === 'location-vote') {
            setLocationCandidates(initialState.initialState.candidates)
        }
    }, [initialState])
    const handleLocationSelect = (id: string) => {
        setSelectedLocation(id)
        socket?.emit('vote-location', {
            candidateId: id
        })
    }
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                title="만날 장소를 정해보아요."
                progress={2}
                voteLimit="1인 1투표"
            />
            <div className="mt-20 flex flex-col gap-13">
                {locationCandidates.map(location => (
                    <LocationVoteItem
                        key={location.id}
                        location={location}
                        handleLocationSelect={handleLocationSelect}
                        isSelected={selectedLocation === location.id}
                    />
                ))}
            </div>
        </div>
    )
}
