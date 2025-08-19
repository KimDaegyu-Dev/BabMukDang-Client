import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import {
    ProfileDefaultIcon,
    TimeIcon,
    LocationIcon,
    EmptyViewIcon,
    PeopleIcon,
    KebabIcon
} from '@/assets/icons'
import { mockAnnouncements } from '@/constants/mockData'

import { useHeader, useCarousel } from '@/hooks'
import {
    BottomSheet,
    ModalTrigger,
    TabHeader,
    JoinCompleteModal,
    MutalButtonSmall
} from '@/components'
import { MatchingAnnouncement } from '@/types'

export function MatchingPage() {
    const [activeTab, setActiveTab] = useState<'announcement' | 'invitation'>(
        'announcement'
    )
    const { resetHeader, setTitle, showCenterElement, hideLeftButton } =
        useHeader()

    const tabs = [
        { key: 'announcement', label: '공고' },
        { key: 'invitation', label: '초대장' }
    ]
    const [hadMeal, setHadMeal] = useState(false)
    useEffect(() => {
        setTitle('매칭')
        showCenterElement()
        hideLeftButton()
        return () => {
            resetHeader()
        }
    }, [])

    return (
        <div className="absolute top-0 left-0 flex h-full w-screen flex-col">
            <TabHeader
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={tab =>
                    setActiveTab(tab as 'announcement' | 'invitation')
                }
            />
            {activeTab === 'announcement' ? (
                <AnnouncementTab announcements={mockAnnouncements} />
            ) : (
                <InvitationTab />
            )}
        </div>
    )
}

function ToggleButton() {
    const [isOn, setIsOn] = useState(false)

    const handleToggle = () => {
        setIsOn(!isOn)
    }

    return (
        <div className="flex w-full items-center justify-between pt-18 pb-8">
            <span className="text-title2-bold text-gray-7">식사 상태</span>
            <div
                className={`rounded-20 flex h-32 w-60 cursor-pointer items-center p-3 transition-all duration-200 ${
                    isOn ? 'bg-primary-500' : 'bg-gray-3'
                }`}
                onClick={handleToggle}>
                <div
                    className={`shadow-drop-1 h-25 w-25 rounded-full bg-white transition-transform duration-200 ${
                        isOn ? 'translate-x-28' : 'translate-x-0'
                    }`}
                />
            </div>
        </div>
    )
}

function AnnouncementTab({
    announcements
}: {
    announcements: MatchingAnnouncement[]
}) {
    const {
        containerRef,
        cardRef,
        translateX,
        currentIndex,
        goToNext,
        goToPrev,
        goToIndex,
        isDragging,
        handleCardClick
    } = useCarousel({
        itemCount: announcements.length,
        threshold: window.innerWidth / 8,
        duration: 300,
        initialPosition: window.innerWidth / 2 - 280 / 2,
        clickThreshold: 5 // 5px 이내 움직임만 클릭으로 인정
    })

    return (
        <div className="bg-primary-100 flex h-full flex-col justify-center pb-90">
            <div className="flex flex-1 flex-col justify-center pb-90">
                <div
                    className="flex w-full flex-row overflow-hidden select-none"
                    ref={containerRef}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}>
                    {announcements.length > 0 ? (
                        <div
                            className="flex flex-row gap-16"
                            style={{
                                transform: `translateX(${translateX}px)`,
                                transition: isDragging
                                    ? 'none'
                                    : 'transform 0.3s ease-out'
                            }}>
                            {announcements.map((announcement, index) => {
                                const isActive = index === currentIndex

                                // 중앙 카드와의 거리에 따른 스타일 계산
                                const scale = isActive ? 1 : 0.85
                                const opacity = isActive ? 1 : 0.6
                                const rotate = isActive
                                    ? 0
                                    : index < currentIndex
                                      ? 10
                                      : -10
                                const filter = isActive ? 'none' : 'blur(0.5px)'

                                return (
                                    <div
                                        key={announcement.id}
                                        className="z-100 flex w-280 flex-col gap-16 transition-all duration-300 ease-out"
                                        style={{
                                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                                            opacity: opacity,
                                            filter: filter,
                                            pointerEvents: isDragging
                                                ? 'none'
                                                : 'auto' // 드래그 중에는 클릭 방지
                                        }}
                                        onClick={e => handleCardClick(index, e)}
                                        onTouchStart={e =>
                                            handleCardClick(index, e)
                                        }>
                                        <AnnouncementCard
                                            announcement={announcement}
                                            cardRef={
                                                cardRef as React.RefObject<HTMLDivElement>
                                            }
                                            index={index}
                                            currentIndex={currentIndex}
                                            isActive={isActive}
                                        />
                                        {isActive && (
                                            <JoinButton
                                                announcement={
                                                    announcements[currentIndex]
                                                }
                                                disabled={isDragging}
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div
                            style={{
                                transform: `translateX(${translateX}px)`,
                                transition: isDragging
                                    ? 'none'
                                    : 'transform 0.3s ease-out'
                            }}>
                            <EmptyAnnouncementCard />
                        </div>
                    )}
                </div>
                <JoinCompleteModal
                    id="join-complete-modal"
                    title="참여하기가 완료되었습니다."
                    description="최종 매칭이 완료되면 알림을 보내드릴게요."
                    acceptText="알림 받기"
                />
                <BottomSheet initialExposure={75}>
                    <div className="relative flex h-full w-full flex-col items-center justify-baseline gap-35 bg-gradient-to-b from-white to-[#FED9CB] pt-12">
                        <KebabIcon className="absolute top-8 right-20 bottom-0" />
                        <span className="text-body1-semibold text-primary-main">
                            나의 공고
                        </span>
                        <div className="flex w-280 flex-col gap-12">
                            <AddAnnouncementCard
                                announcement={mockAnnouncements[0]}
                            />
                            <AddAnnouncementButton />
                        </div>
                    </div>
                </BottomSheet>
            </div>
        </div>
    )
}

function InvitationTab() {
    return (
        <div className="flex flex-col gap-40 px-20">
            {/* 식사 상태 토글 버튼 */}
            <ToggleButton />
            <RecieveInvitationList />
            <FrientList />
            <div className="flex flex-1 flex-col items-center justify-center">
                <span className="text-body1-semibold text-gray-4 text-center">
                    아직 받은 초대장이 없어요
                </span>
            </div>
        </div>
    )
}
function EmptyAnnouncementCard() {
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
function RecieveInvitationList() {
    return (
        <div className="rounded-12 shadow-drop-1 flex w-full flex-col gap-16 bg-white p-16">
            {/* 상단 */}
            <div className="flex flex-row items-center justify-between">
                <span className="text-body1-semibold text-gray-8">
                    받은 초대장
                </span>
                <span className="text-caption-medium text-right text-gray-300">
                    더보기 +
                </span>
            </div>
            {/* 하단 */}
            <div className="flex flex-row justify-between">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div className="flex flex-col items-center gap-4">
                        <Link to="/read-invitation">
                            <ProfileDefaultIcon className="size-50" />
                            <span className="text-caption-medium text-gray-5">
                                김대규
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
function FrientList() {
    return (
        <div className="flex w-full flex-col gap-16">
            <div className="flex flex-col gap-16">
                <span className="text-title2-bold text-gray-8">친구목록</span>
                {/* <SearchLocationInput handleSearch={() => {}} /> */}
            </div>
            <div>
                <FriendCard />
            </div>
        </div>
    )
}
function FriendCard() {
    return (
        <div className="rounded-12 flex flex-row items-center justify-between bg-white p-12">
            <div className="flex flex-row items-center gap-13">
                <ProfileDefaultIcon className="size-20" />
                <div className="flex h-full flex-col gap-8">
                    <span className="text-body1-bold">친구목록</span>
                    <span className="text-caption-medium text-primary-500">
                        4시간 공복이에요{' '}
                    </span>
                </div>
            </div>
            {/* 초대장 아이콘 */}
            <Link to="/send-invitation">
                <div className="bg-primary-500 size-40"></div>
            </Link>
        </div>
    )
}
function AnnouncementCard({
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

function AddAnnouncementCard({
    announcement
}: {
    announcement: MatchingAnnouncement
}) {
    return (
        <div
            className={`shadow-drop-1 rounded-16 h-353 w-full bg-white px-12 py-8 transition-all duration-200`}>
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

function JoinButton({
    announcement,
    disabled
}: {
    announcement: MatchingAnnouncement
    disabled?: boolean
}) {
    return (
        <ModalTrigger
            forId="join-complete-modal"
            disabled={disabled}>
            <MutalButtonSmall
                text="참여하기"
                className={`${
                    disabled ? 'bg-gray-4 cursor-not-allowed' : 'bg-gray-7'
                }`}
            />
        </ModalTrigger>
    )
}

function AddAnnouncementButton() {
    const handleAddAnnouncement = () => {
        console.log('Add announcement button clicked')
    }

    return (
        <MutalButtonSmall
            text="공고 마감하기"
            onClick={handleAddAnnouncement}></MutalButtonSmall>
    )
}
