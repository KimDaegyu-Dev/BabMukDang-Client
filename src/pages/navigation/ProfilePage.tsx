import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ChallengeIcon, ArrowForwardIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'
import { BOTTOM_NAVIGATION_HEIGHT } from '@/constants/bottomNav'
import { userProfile } from '@/constants/mockData'

import { useHeader } from '@/hooks'
import { ModalTrigger, FriendInviteModal, ProfileModal } from '@/components'

export function ProfilePage() {
    const { hideHeader, resetHeader } = useHeader()
    useEffect(() => {
        hideHeader()
        return () => {
            resetHeader()
        }
    }, [])
    return (
        <main className="relative h-full min-h-full">
            {/* 프로필 섹션 */}
            <section className="-ml-20 flex w-screen flex-col items-center gap-12 bg-white py-20">
                <div className="flex flex-col items-center gap-7">
                    <img
                        src={userProfile.profileImage}
                        alt="프로필 이미지"
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--color-gray-2)'
                        }}
                    />
                    <div className="flex flex-col items-center gap-6">
                        <div className="text-title2-semibold text-black">
                            {userProfile.name}
                        </div>
                        <div className="text-caption-medium text-gray-6">
                            {userProfile.description}
                        </div>
                    </div>
                </div>
                {/* 선호도 */}
                <ModalTrigger
                    forId="profile-notify-modal"
                    className="rounded-12 bg-gray-1 flex items-center gap-10 p-12">
                    <div className="flex flex-col gap-8">
                        {/* 좋아하는 메뉴 */}
                        <div className="flex items-center gap-8">
                            <span className="text-caption-medium text-primary-500">
                                좋아해요!
                            </span>
                            <div className="flex flex-wrap justify-center gap-4">
                                {userProfile.preferredMenus.map(
                                    (menu, index) =>
                                        index < 3 && (
                                            <span
                                                key={index}
                                                className="text-caption-10 text-primary-500 bg-primary-200 rounded-full border px-8 py-3"
                                                style={{ fontSize: 13 }}>
                                                {menu}
                                            </span>
                                        )
                                )}
                            </div>
                        </div>
                        {/* 못먹는 메뉴 */}
                        <div className="flex items-center gap-8">
                            <span className="text-caption-medium text-gray-6">
                                못먹어요!
                            </span>
                            <div className="flex flex-wrap justify-center gap-4">
                                {userProfile.cantEat.map(
                                    (menu, index) =>
                                        index < 3 && (
                                            <span
                                                key={index}
                                                className="text-caption-10 text-gray-4 bg-gray-2 rounded-full border px-8 py-3"
                                                style={{ fontSize: 13 }}>
                                                {menu}
                                            </span>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                    <ArrowForwardIcon />
                </ModalTrigger>
            </section>
            <section className="bg-gray-1 flex flex-col gap-10 pt-10">
                {/* 친구, 밥약 관리 버튼 */}
                <div className="flex w-full justify-between gap-12">
                    <button className="rounded-12 flex w-full flex-col items-center gap-8 bg-white py-8">
                        <span className="text-body2-semibold text-gray-8 text-center text-nowrap">
                            친구
                        </span>
                        <span className="text-body2-semibold text-gray-6">
                            100
                        </span>
                    </button>
                    <button className="rounded-12 flex w-full flex-col items-center gap-8 bg-white py-8">
                        <span className="text-body2-semibold text-gray-8 text-center text-nowrap">
                            완료 밥약
                        </span>
                        <span className="text-body2-semibold text-gray-6">
                            100
                        </span>
                    </button>
                    <button className="rounded-12 flex w-full flex-col items-center gap-8 bg-white py-8">
                        <span className="text-body2-semibold text-gray-8 text-center text-nowrap">
                            예정 밥약
                        </span>
                        <span className="text-body2-semibold text-gray-6">
                            100
                        </span>
                    </button>
                </div>

                {/* 친구 초대하기 */}
                <ModalTrigger
                    forId="friend-invite-notify-modal"
                    className="rounded-12 bg-primary-100 border-primary-400 flex items-center justify-between border px-16 py-18">
                    <span className="text-body1-semibold text-gray-8">
                        친구 초대하기
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="text-caption-10 text-gray-4">
                            초대 받은 친구가 가입시, 랜덤 쿠폰 증정!
                        </span>
                        <ArrowForwardIcon />
                    </div>
                </ModalTrigger>
                {/* 챌린지 */}
                <button className="rounded-12 flex flex-col gap-20 bg-white px-16 py-18">
                    <div className="flex items-center justify-between">
                        <span className="text-body1-semibold text-gray-8">
                            챌린지
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="text-body2-medium text-gray-4">
                                3/7일
                            </span>
                            <ArrowForwardIcon />
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <ChallengeIcon
                                    className="z-1 flex h-20 w-20 items-center"
                                    strokecolor={
                                        index < 3
                                            ? COLORS.primary200
                                            : COLORS.gray2
                                    }
                                    bgcolor={
                                        index < 3 ? COLORS.primary400 : 'none'
                                    }
                                    fillcolor={
                                        index < 3
                                            ? COLORS.primaryMain
                                            : COLORS.gray3
                                    }
                                />
                                <div
                                    className={`${
                                        index < 2
                                            ? 'border-primary-200'
                                            : 'border-gray-2'
                                    } -mr-1 -ml-1 h-0 flex-1 border-2 last:hidden`}></div>
                            </React.Fragment>
                        ))}
                    </div>
                </button>
                {/* 쿠폰 보관함 */}
                <Link
                    to="/coupon"
                    className="rounded-12 flex items-center justify-between bg-white px-16 py-18">
                    <span className="text-body1-semibold text-gray-8">
                        쿠폰 보관함
                    </span>
                    <ArrowForwardIcon />
                </Link>
                {/* 지난 밥 인증 내역 */}
                <button className="rounded-12 flex items-center justify-between bg-white px-16 py-18">
                    <span className="text-body1-semibold text-gray-8">
                        지난 밥 인증 내역
                    </span>
                    <ArrowForwardIcon />
                </button>
            </section>
            <button
                className={`text-caption-regular text-gray-3 absolute bottom-${BOTTOM_NAVIGATION_HEIGHT} right-0 left-0`}>
                로그아웃
            </button>
            <FriendInviteModal id="friend-invite-notify-modal" />
            <ProfileModal
                id="profile-notify-modal"
                preferredMenus={userProfile.preferredMenus}
                cantEat={userProfile.cantEat}
            />
        </main>
    )
}
