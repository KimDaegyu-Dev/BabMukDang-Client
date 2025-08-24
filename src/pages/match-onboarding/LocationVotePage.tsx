import { LocationVoteItem } from '@/components'
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
        <>
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
        </>
    )
}
