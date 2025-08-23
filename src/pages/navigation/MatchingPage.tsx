import { useEffect, useState } from 'react'

import { MockAnnouncements, MockFriendList } from '@/constants/mockData'
import { PostResponse } from '@/apis/dto'

import { useHeader } from '@/hooks'
import {
    TabHeader,
    JoinCompleteModal,
    AnnouncementCarousel,
    InvitationToggleButton,
    RecieveInvitationList,
    AnnouncementBottomSheet,
    FriendListSection
} from '@/components'
import { BOTTOM_NAVIGATION_HEIGHT } from '@/constants/bottomNav'
import { useGetAnnouncements } from '@/query/announcementQuery'
import { useAuthStore } from '@/store'

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
    useEffect(() => {
        setTitle('매칭')
        showCenterElement()
        hideLeftButton()
        return () => {
            resetHeader()
        }
    }, [])

    const [announcements, setAnnouncements] = useState<PostResponse[]>([])

    const { setTokens } = useAuthStore()
    const { data: announcementsData } = useGetAnnouncements()
    useEffect(() => {
        setTokens({
            accessToken:
                'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzU1ODk4NTcwLCJleHAiOjE3NTU5MDIxNzAsInVzZXJuYW1lIjoi6rmA64yA6recIiwiZW1haWwiOiI5dXRhbmdAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfTUVNQkVSIn0.gYC9impIDlIKSmaejT9WVdFGR2uBhu4X3SVrfNsoGBw',
            refreshToken: ''
        })
        console.log('announcementsData', announcementsData)
        setAnnouncements(announcementsData || [])
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
                <AnnouncementTab announcements={announcements} />
            ) : (
                <InvitationTab />
            )}
        </div>
    )
}

function AnnouncementTab({ announcements }: { announcements: PostResponse[] }) {
    return (
        <div className="bg-primary-100 flex h-full flex-col justify-center pb-90">
            <div className="flex flex-1 flex-col justify-center pb-90">
                <AnnouncementCarousel announcements={announcements} />
                <JoinCompleteModal
                    id="join-complete-modal"
                    title="참여하기가 완료되었습니다."
                    description="최종 매칭이 완료되면 알림을 보내드릴게요."
                    acceptText="알림 받기"
                />
                <AnnouncementBottomSheet />
            </div>
        </div>
    )
}

function InvitationTab() {
    return (
        <div
            className={`flex flex-col gap-40 px-20 pt-18 pb-${BOTTOM_NAVIGATION_HEIGHT}`}>
            {/* 식사 상태 토글 버튼 */}
            <div className="flex flex-col gap-16">
                <InvitationToggleButton />
                <RecieveInvitationList />
            </div>
            <div className="flex flex-col items-center justify-center pb-10">
                <FriendListSection friendList={MockFriendList} />
            </div>
        </div>
    )
}
