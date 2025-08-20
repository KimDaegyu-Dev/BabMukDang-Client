import {
    SwipeableCard,
    MatchingInviteNotiCard,
    EmptyNotiView
} from '@/components'

type MatchingInviteNoti = {
    id: number
    type: 'invitation' | 'announcement'
    title: string
    time: string
    message: string
    period: string
    imageUrl: string
}
export function MatchingInviteList({
    matchingNotis,
    handleDeleteMatchingNoti,
    handleMatchingInviteNotiClick
}: {
    matchingNotis: MatchingInviteNoti[]
    handleDeleteMatchingNoti: (id: number) => void
    handleMatchingInviteNotiClick: (type: 'invitation' | 'announcement') => void
}) {
    if (matchingNotis.length === 0) {
        return <EmptyNotiView isMatching />
    }
    return (
        <div className="flex flex-col">
            {matchingNotis.map(noti => (
                <SwipeableCard
                    key={noti.id}
                    onDelete={() => handleDeleteMatchingNoti(noti.id)}>
                    <MatchingInviteNotiCard
                        noti={noti}
                        onClick={() => handleMatchingInviteNotiClick(noti.type)}
                    />
                </SwipeableCard>
            ))}
        </div>
    )
}
