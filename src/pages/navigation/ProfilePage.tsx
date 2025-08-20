import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BOTTOM_NAVIGATION_HEIGHT } from '@/constants/bottomNav'
import { MockMyProfileData } from '@/constants/mockData'

import { useHeader } from '@/hooks'
import {
    FriendInviteModal,
    ProfileModal,
    ProfileButtonSection,
    ProfileSection
} from '@/components'

type MyProfileData = {
    profileImgUrl: string
    name: string
    description: string
    preferredMenus: string[]
    cantEat: string[]
    friends: number
    completedMeetings: number
    uncompletedMeetings: number
    challengeCount: number
}

export function ProfilePage() {
    const { hideHeader, resetHeader } = useHeader()
    const navigate = useNavigate()
    useEffect(() => {
        hideHeader()
        return () => {
            resetHeader()
        }
    }, [])
    return (
        <main className="relative h-full min-h-full">
            {/* 프로필 섹션 */}
            <ProfileSection
                profileImgUrl={MockMyProfileData.profileImgUrl}
                name={MockMyProfileData.name}
                description={MockMyProfileData.description}
                preferredMenus={MockMyProfileData.preferredMenus}
                cantEat={MockMyProfileData.cantEat}
                isFriend={false}
            />
            <ProfileButtonSection
                friends={MockMyProfileData.friends}
                completedMeetings={MockMyProfileData.completedMeetings}
                uncompletedMeetings={MockMyProfileData.uncompletedMeetings}
                challengeCount={MockMyProfileData.challengeCount}
            />
            <button
                className={`text-caption-regular text-gray-3 absolute bottom-${BOTTOM_NAVIGATION_HEIGHT} right-0 left-0`}
                onClick={() => {
                    navigate('/start-register')
                }}>
                로그아웃
            </button>
            <FriendInviteModal id="friend-invite-notify-modal" />
            <ProfileModal
                id="profile-notify-modal"
                preferredMenus={MockMyProfileData.preferredMenus}
                cantEat={MockMyProfileData.cantEat}
            />
        </main>
    )
}
