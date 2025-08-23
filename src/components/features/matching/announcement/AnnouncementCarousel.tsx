import { useCarousel } from '@/hooks'
import { PostResponse } from '@/apis/dto'
import { AnnouncementCard, EmptyAnnouncementCard } from './AnnouncementCard'
import { JoinButton } from './AnnouncementJoinButton'
import { useAuthStore } from '@/store'

export function AnnouncementCarousel({
    announcements
}: {
    announcements: PostResponse[]
}) {
    const {
        containerRef,
        cardRef,
        translateX,
        currentIndex,
        isDragging,
        handleCardClick
    } = useCarousel({
        itemCount: announcements.length,
        threshold: window.innerWidth / 8,
        duration: 300,
        initialPosition: window.innerWidth / 2 - 280 / 2,
        clickThreshold: 5 // 5px 이내 움직임만 클릭으로 인정
    })
    const { userId } = useAuthStore()
    return (
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
                    {announcements
                        .filter(
                            //todo 임시 코드
                            announcement =>
                                (announcement as any).authorId !== userId
                        )
                        .map((announcement, index) => {
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
                                        <JoinButton disabled={isDragging} />
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
    )
}
