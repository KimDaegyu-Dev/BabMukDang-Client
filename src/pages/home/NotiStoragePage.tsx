import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EmptyViewNotiIcon, MatchingIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'
import {
    mockLocalNewsNotis,
    mockMatchingInviteNotis
} from '@/constants/mockData'

import { useHeader } from '@/hooks'
import { TabHeader, SwipeableCard } from '@/components'

// Types for notifications
interface MatchingInviteNoti {
    id: number
    type: 'invitation' | 'announcement'
    title: string
    time: string
    message: string
    period: string
    imageUrl?: string
}
interface LocalNewsNoti {
    id: number
    type: 'local'
    title: string
    time: string
    message: string
    period: string
    imageUrl?: string
}
// 학교 제휴, 상권 이벤트, 지역 이벤트
type LocalNewsFilter = 'school' | 'restaurant' | 'area'

type Notification = MatchingInviteNoti | LocalNewsNoti

export function NotiStoragePage() {
    const navigate = useNavigate()
    const [tab, setTab] = useState<'noti' | 'local'>('noti')
    const [matchingNotis, setMatchingNotis] = useState<MatchingInviteNoti[]>(
        mockMatchingInviteNotis as MatchingInviteNoti[]
    )

    const [localNewsNotis, setLocalNewsNotis] = useState<LocalNewsNoti[]>(
        mockLocalNewsNotis as LocalNewsNoti[]
    )
    const notiList = tab === 'noti' ? matchingNotis : localNewsNotis

    const [filter, setFilter] = useState<LocalNewsFilter>('school')
    const filterList: LocalNewsFilter[] = ['school', 'restaurant', 'area']
    const filterLabel = {
        school: '우리 학교 제휴',
        restaurant: '상권 이벤트',
        area: '지역 이벤트'
    }
    const { resetHeader, setTitle, showCenterElement } = useHeader()

    const tabs = [
        { key: 'noti', label: '알림' },
        { key: 'local', label: '동네소식' }
    ]

    // 삭제 핸들러들
    const handleDeleteMatchingNoti = (id: number) => {
        setMatchingNotis(prev => prev.filter(noti => noti.id !== id))
    }

    const handleDeleteLocalNewsNoti = (id: number) => {
        setLocalNewsNotis(prev => prev.filter(noti => noti.id !== id))
    }

    const handleMatchingInviteNotiClick = (
        type: 'invitation' | 'announcement'
    ) => {
        if (type === 'invitation') {
            navigate(`/invitation/waiting/1`)
        } else {
            navigate(`/announcement/waiting/1`)
        }
    }

    useEffect(() => {
        showCenterElement()
        setTitle('알림')
        return () => {
            resetHeader()
        }
    }, [])
    return (
        <div className="absolute top-0 left-0 flex h-full w-screen flex-col">
            <TabHeader
                tabs={tabs}
                activeTab={tab}
                onTabChange={tab => setTab(tab as 'noti' | 'local')}
            />
            {tab === 'local' && (
                <div className="my-16 ml-18 flex flex-row gap-10">
                    {filterList.map((filterName, index) => (
                        <NotiFilter
                            key={index}
                            filter={filter}
                            filterName={filterName}
                            filterLabel={filterLabel[filterName]}
                            setFilter={setFilter}
                        />
                    ))}
                </div>
            )}
            {notiList.length === 0 ? (
                <EmptyNotiView />
            ) : (
                <div className="flex flex-col">
                    {notiList.map(noti =>
                        noti.type === 'invitation' ||
                        noti.type === 'announcement' ? (
                            <SwipeableCard
                                key={noti.id}
                                onDelete={() =>
                                    handleDeleteMatchingNoti(noti.id)
                                }>
                                <MatchingInviteNotiCard
                                    noti={noti}
                                    onClick={() =>
                                        handleMatchingInviteNotiClick(noti.type)
                                    }
                                />
                            </SwipeableCard>
                        ) : (
                            noti.type === 'local' && (
                                <SwipeableCard
                                    key={noti.id}
                                    onDelete={() =>
                                        handleDeleteLocalNewsNoti(noti.id)
                                    }>
                                    <LocalNewsNotiCard noti={noti} />
                                </SwipeableCard>
                            )
                        )
                    )}
                </div>
            )}
        </div>
    )
}

function NotiFilter({
    filter,
    setFilter,
    filterName,
    filterLabel
}: {
    filter: LocalNewsFilter
    setFilter: (f: LocalNewsFilter) => void
    filterName: LocalNewsFilter
    filterLabel: string
}) {
    return (
        <div
            className={`flex cursor-pointer flex-row gap-10 rounded-full px-12 py-6 ${filter === filterName ? 'bg-primary-500' : 'bg-white'}`}
            onClick={() => setFilter(filterName)}>
            <span
                className={`text-body2-semibold ${filter === filterName ? 'text-white' : 'text-gray-4'}`}>
                {filterLabel}
            </span>
        </div>
    )
}

function EmptyNotiView() {
    return (
        <div className="mt-60 flex h-full flex-col items-center justify-center">
            <EmptyViewNotiIcon className="mb-10" />
            <span className="text-body1-semibold text-center text-gray-400">
                아직 받은 알림이 없어요
            </span>
        </div>
    )
}

function MatchingInviteNotiCard({
    noti,
    onClick
}: {
    noti: MatchingInviteNoti
    onClick: () => void
}) {
    return (
        <div
            className="flex w-full flex-col gap-10 px-20 py-16"
            onClick={onClick}>
            <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-8">
                    <MatchingIcon
                        bgcolor={COLORS.primary100}
                        strokecolor={COLORS.primaryMain}
                    />
                    <span className="text-body1-semibold text-gray-7">
                        {noti.title}
                    </span>
                </div>
                <span className="text-caption-medium text-gray-3">
                    {noti.time}
                </span>
            </div>
            <span className="text-caption-medium text-gray-5 w-full">
                {noti.message}
            </span>
        </div>
    )
}
function LocalNewsNotiCard({ noti }: { noti: LocalNewsNoti }) {
    return (
        <div className="flex w-full flex-col gap-10 px-20 py-16">
            <div className="flex w-full flex-row items-center justify-between">
                <span className="text-body2-semibold text-gray-7">
                    {noti.title}
                </span>
                <span className="text-caption-medium text-gray-3">
                    {noti.time}
                </span>
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex h-full flex-col justify-between">
                    <span className="text-body1-semibold w-full text-wrap text-black">
                        {noti.message}
                    </span>
                    <span className="text-caption-medium text-gray-5 w-full">
                        {noti.period}
                    </span>
                </div>
                <img
                    src={noti.imageUrl}
                    alt="local news"
                    className="rounded-5 bg-gray-1 h-58 w-58"
                />
            </div>
        </div>
    )
}
