export function FriendProfileSection({
    friends,
    completedMeetings,
    uncompletedMeetings
}: {
    friends: number
    completedMeetings: number
    uncompletedMeetings: number
}) {
    return (
        <section className="flex flex-col gap-10 pt-10">
            {/* 친구, 밥약 관리 버튼 */}
            <div className="flex w-full justify-between gap-12">
                <button className="rounded-12 flex w-full flex-col items-center gap-8 bg-white py-8">
                    <span className="text-body2-semibold text-gray-8 text-center text-nowrap">
                        친구
                    </span>
                    <span className="text-body2-semibold text-gray-6">
                        {friends}
                    </span>
                </button>
                <button className="rounded-12 flex w-full flex-col items-center gap-8 bg-white py-8">
                    <span className="text-body2-semibold text-gray-8 text-center text-nowrap">
                        완료 밥약
                    </span>
                    <span className="text-body2-semibold text-gray-6">
                        {completedMeetings}
                    </span>
                </button>
                <button className="rounded-12 flex w-full flex-col items-center gap-8 bg-white py-8">
                    <span className="text-body2-semibold text-gray-8 text-center text-nowrap">
                        예정 밥약
                    </span>
                    <span className="text-body2-semibold text-gray-6">
                        {uncompletedMeetings}
                    </span>
                </button>
            </div>
            {/* 지난 밥 인증 내역 */}
            <span className="text-body2-semibold text-gray-8">
                지난 밥 인증 내역
            </span>
            <div className="grid grid-cols-3 justify-items-center gap-12 pt-20">
                {[...Array(100)].map((_, index) => (
                    <BobCheckHistoryItem key={index} />
                ))}
            </div>
        </section>
    )
}

function BobCheckHistoryItem() {
    return (
        <div className="rounded-12 bg-gary-3 relative h-110 w-110 overflow-hidden">
            <img
                className="rounded-12 h-full w-full"
                src={'/images/bob_check_history_item.png'}></img>
            {/* badge_date */}
        </div>
    )
}
