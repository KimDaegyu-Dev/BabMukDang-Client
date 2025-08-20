import { MatchingAnnouncement } from '@/types'
import {
    ProfileDefaultIcon,
    TimeIcon,
    LocationIcon,
    PeopleIcon,
    EmptyViewIcon
} from '@/assets/icons'

export function AnnouncementCard({
    announcement,
    cardRef,
    index,
    currentIndex,
    isActive
}: {
    announcement: MatchingAnnouncement
    cardRef: React.RefObject<HTMLDivElement>
    index: number
    currentIndex: number
    isActive: boolean
}) {
    return (
        <div
            ref={currentIndex === index ? cardRef : null}
            className={`shadow-drop-1 rounded-16 h-353 w-full bg-white px-12 py-8 transition-all duration-200 ${
                isActive ? 'cursor-pointer hover:shadow-lg' : 'cursor-pointer'
            }`}>
            {/* Header with creator info and time left */}
            <div className="mb-12 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <ProfileDefaultIcon className="size-20" />
                    <span className="text-body1-semibold">
                        {announcement.creator.name}
                    </span>
                </div>
                <span className="text-caption-medium text-gray-5">
                    {announcement.timeLeft}
                </span>
            </div>

            {/* Title */}
            <div className="mb-16 text-center">
                <span className="text-title1-bold whitespace-pre-line">
                    {announcement.title}
                </span>
            </div>

            {/* Time and Location Info */}
            <div className="rounded-12 bg-primary-500 mb-16 p-16">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <TimeIcon />
                        <span className="text-body2-semibold text-white">
                            {announcement.time}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <LocationIcon />
                        <span className="text-body2-semibold text-white">
                            {announcement.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <PeopleIcon />
                        <span className="text-body2-semibold text-white">
                            {announcement.maxParticipants}명
                        </span>
                    </div>
                </div>
            </div>

            {/* Participants */}
            <div className="mb-12">
                <span className="text-caption-medium text-gray-4">
                    함께 하는 친구
                </span>
            </div>

            <div className="rounded-50 border-primary-200 border p-8">
                <div className="flex flex-row gap-8">
                    {announcement.participants.map((participant, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-8">
                            <ProfileDefaultIcon className="size-20" />
                            <span className="text-body2-medium">
                                {participant.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function EmptyAnnouncementCard() {
    return (
        <div className="shadow-drop-1 rounded-16 h-353 w-280 origin-center translate-x-[-50%] bg-white px-12 py-8">
            <div className="flex h-full flex-col items-center justify-center gap-16">
                <div className="flex w-136 flex-col items-center gap-16">
                    <EmptyViewIcon />
                    <span className="text-body1-semibold text-gray-4 text-center whitespace-pre-line">
                        {'오늘은 아직 올라온\n공고가 없어요'}
                    </span>
                </div>
            </div>
        </div>
    )
}
