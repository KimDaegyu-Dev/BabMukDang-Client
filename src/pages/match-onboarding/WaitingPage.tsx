import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useMatchStore } from '@/store/matchStore'
import { useSocket } from '@/contexts/SocketContext'
import { LocationGrayIcon, PeopleGrayIcon, TimeGrayIcon } from '@/assets/icons'

export function WaitingPage() {
    const navigate = useNavigate()
    const { matchType } = useSocket()
    const matchedUser = {
        id: '1',
        name: '김사자',
        profileImage: undefined
    }

    const meetingInfo = {
        location: '서울시 강남구 역삼동 근처',
        time: '오후 1시 약속',
        maxParticipants: 2
    }
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-baseline pt-100">
            {/* 메인 컨텐츠 */}
            <div className="flex flex-col items-center">
                {/* 매칭 완료 메시지 */}
                <h1 className="text-title1-semibold mb-32 text-center text-black">
                    {matchType === 'announcement'
                        ? '오늘의 한끼 멤버'
                        : '한끼 제안,'}
                    <br />
                    {matchType === 'announcement'
                        ? '모집 완료!🎉'
                        : '약속이 성사됐어요🎉'}
                </h1>

                {/* 프로필 이미지 */}
                <div className="shadow-drop-1 mb-20 h-[169px] w-[169px] overflow-hidden rounded-full">
                    {matchedUser?.profileImage ? (
                        <img
                            src={matchedUser.profileImage}
                            alt={`${matchedUser.name} 프로필`}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="bg-gray-3 flex h-full w-full items-center justify-center">
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                    stroke="#979797"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="12"
                                    cy="7"
                                    r="4"
                                    stroke="#979797"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* 사용자 이름 */}
                <h2 className="text-title1-semibold mb-32 text-black">
                    {matchedUser?.name || '사용자'} 님
                </h2>

                {/* Time and Location Info */}
                <div className="rounded-12 border-primary-400 mb-14 border p-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <TimeGrayIcon />
                            <span className="text-body2-semibold text-black">
                                {meetingInfo.time}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <LocationGrayIcon />
                            <span className="text-body2-semibold text-black">
                                {meetingInfo.location}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <PeopleGrayIcon />
                            <span className="text-body2-semibold text-black">
                                {meetingInfo.maxParticipants}명
                            </span>
                        </div>
                    </div>
                </div>

                {/* 매칭 취소하기 */}
                <button
                    // onClick={handleCancelMatching}
                    className="text-body1-medium text-gray-4">
                    매칭 취소하기
                </button>
            </div>
        </div>
    )
}
