import { useEffect, useState } from 'react'

import { BackIcon, CalendarIcon, LocationIcon, MenuIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'

import { useHeader } from '@/hooks'
import { TagPerson } from '@/components'

export function MeetingPage() {
    const { resetHeader, hideHeader } = useHeader()
    useEffect(() => {
        hideHeader()
        hideHeader()
        return () => {
            resetHeader()
        }
    }, [])
    return (
        <div className="flex w-full flex-1 flex-col items-center gap-16 pt-303">
            {/* MeetingHeader */}
            <MeetingHeader />

            <MeetingFilter />

            <div className="flex w-full flex-col gap-16">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <MeetingCard
                        key={idx}
                        isPast={idx % 2 === 0}
                        onClick={() => {
                            console.log('clicked')
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

function MeetingHeader() {
    return (
        <div className="bg-primary-500 absolute top-0 left-0 flex h-287 w-screen flex-col items-center justify-end gap-10 px-20">
            {/* 상단 섹션 */}
            <div className="flex w-full flex-col gap-32">
                {/* 제목과 참여자 태그, 캘린더 아이콘 */}
                <div className="flex w-full items-center">
                    {/* 왼쪽: 제목과 참여자 태그 */}
                    <div className="flex w-full flex-col gap-12">
                        {/* 메인 제목 */}
                        <span className="text-title2-semibold text-white">
                            오늘 약속이에요.
                            <br />
                            잊지말고 참여해주세요!
                        </span>

                        {/* 참여자 태그들 */}
                        <div className="flex items-center gap-8">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <TagPerson
                                    key={idx}
                                    name={`${idx}`}
                                    orange={true}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 오른쪽: 캘린더 아이콘 */}
                    <CalendarIcon />
                </div>

                {/* 하단 섹션 */}
                <div className="flex w-full flex-col gap-12">
                    {/* 위치와 시간 정보 */}
                    <div className="flex w-full items-center justify-between gap-74">
                        {/* 위치 정보 */}
                        <div className="flex items-center gap-4">
                            <LocationIcon strokecolor={COLORS.white} />
                            <span className="text-body2-semibold text-gray-1 w-163">
                                서울과학기술대학교 정문 앞
                            </span>
                        </div>

                        {/* 시간 정보 */}
                        <span className="text-caption-medium text-primary-200">
                            8월 27일 오후 2:30
                        </span>
                    </div>

                    {/* 진행 상태 바 */}
                    <div className="flex w-full flex-col items-end justify-between gap-6">
                        {/* 진행 상태 바 */}
                        <div className="bg-gray-2 rounded-5 flex h-7 w-full items-center">
                            <div className="bg-gray-7 rounded-5 h-9 w-116"></div>
                        </div>
                        <div className="flex w-full justify-between">
                            {/* 진행 상태 텍스트들 */}
                            <span className="text-caption-medium text-gray-1">
                                매칭
                            </span>
                            <span className="text-caption-medium text-gray-1">
                                약속 잡기
                            </span>
                            <span className="text-caption-medium text-primary-400">
                                만남
                            </span>
                            <span className="text-caption-medium text-primary-400">
                                밥 인증
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function MeetingFilter() {
    return (
        <div className="flex w-full flex-col gap-16">
            {/* 필터 탭 */}
            <div className="flex items-center gap-10">
                <div className="border-primary-main rounded-30 flex items-center justify-center border bg-white px-12 py-6">
                    <span className="text-body2-semibold text-primary-main">
                        예정된 약속
                    </span>
                </div>
                <div className="bg-gray-2 rounded-30 flex items-center justify-center px-12 py-6">
                    <span className="text-body2-semibold text-gray-4">
                        지난 약속
                    </span>
                </div>
            </div>
        </div>
    )
}

function MeetingCard({
    isPast,
    onClick
}: {
    isPast: boolean
    onClick: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => {
        setIsOpen(!isOpen)
        onClick()
    }
    return (
        <>
            {/* Default 버전 카드 */}
            <div
                className="relative w-full"
                onClick={handleClick}>
                {/* 카드 내용 */}
                <div className="rounded-12 flex h-full w-full items-stretch justify-between">
                    {/* 왼쪽: 시간 정보 */}
                    <div className="rounded-12 border-gray-2 shadow-drop-1 w-fit flex-none flex-col justify-baseline overflow-hidden border-r-1 border-dashed bg-white p-16 whitespace-nowrap">
                        <div className="flex h-52 w-fit flex-col justify-between">
                            <span className="text-body2-semibold text-black">
                                8월 27일
                            </span>
                            <span className="text-body2-semibold text-black">
                                오후 2:30
                            </span>
                        </div>
                    </div>

                    {/* 오른쪽: 참여자 태그와 위치 */}
                    <div className="rounded-12 shadow-drop-1 flex h-full w-full items-center justify-between bg-white p-16">
                        <div className="flex w-full flex-col gap-11">
                            {/* 참여자 태그들 */}
                            <div className="flex items-center gap-8">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                    <TagPerson
                                        key={idx}
                                        name={`${idx}`}
                                        orange={true}
                                    />
                                ))}
                            </div>

                            {/* 위치 정보 */}
                            <div className="flex items-center gap-4">
                                <LocationIcon strokecolor={COLORS.white} />
                                <span className="text-caption-medium text-gray-8">
                                    서울과학기술대학교 정문 앞dddddddd
                                </span>
                            </div>

                            {isOpen && (
                                <>
                                    {/* 메뉴 정보 */}
                                    <div className="flex items-center gap-4">
                                        <MenuIcon />
                                        <span className="text-caption-medium text-gray-8">
                                            오하이요
                                        </span>
                                        <span className="text-caption-medium text-gray-4">
                                            · 이자카야
                                        </span>
                                    </div>

                                    {/* 취소 버튼 */}
                                    <button className="bg-gray-1 rounded-5 flex items-center justify-center py-5">
                                        <span className="text-caption-medium text-gray-5">
                                            약속 취소하기
                                        </span>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* 화살표 아이콘 (아래 방향) */}
                        <div className="flex h-16 w-16 items-center justify-center">
                            <BackIcon
                                strokecolor={COLORS.gray3}
                                className={`${isOpen ? 'rotate-90' : '-rotate-90'} transition-transform duration-300`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
