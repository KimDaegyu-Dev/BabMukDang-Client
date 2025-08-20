import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BOTTOM_NAVIGATION_HEIGHT } from '@/constants/bottomNav'
import { MockMyProfileData } from '@/constants/mockData'

import { useHeader } from '@/hooks'
import {
    ProfileModal,
    ProfileSection,
    FriendProfileSection
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

export function FriendProfilePage() {
    const navigate = useNavigate()
    return (
        <main className="relative h-full min-h-full">
            {/* 프로필 섹션 */}
            <ProfileSection
                profileImgUrl={MockMyProfileData.profileImgUrl}
                name={MockMyProfileData.name}
                description={MockMyProfileData.description}
                preferredMenus={MockMyProfileData.preferredMenus}
                cantEat={MockMyProfileData.cantEat}
                isFriend={true}
            />
            <FriendProfileSection
                friends={MockMyProfileData.friends}
                completedMeetings={MockMyProfileData.completedMeetings}
                uncompletedMeetings={MockMyProfileData.uncompletedMeetings}
            />
            <ProfileModal
                id="profile-notify-modal"
                preferredMenus={MockMyProfileData.preferredMenus}
                cantEat={MockMyProfileData.cantEat}
            />
        </main>
    )
}
