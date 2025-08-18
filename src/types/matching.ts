export interface MatchingAnnouncement {
    id: number
    title: string
    time: string
    location: string
    participants: { name: string; profileImage?: string }[]
    maxParticipants: number
    timeLeft: string
    creator: { name: string; profileImage?: string }
}
