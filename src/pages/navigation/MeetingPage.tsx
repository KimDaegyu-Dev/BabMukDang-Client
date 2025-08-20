import { useEffect, useState } from 'react'

import { useHeader } from '@/hooks'
import { FilterList, MeetingCard, MeetingHeader } from '@/components'
import { MEETING_FILTER_LIST } from '@/constants/filters'
import { MockMeetingList } from '@/constants/mockData'

export function MeetingPage() {
    const { resetHeader, hideHeader } = useHeader()
    const [activeFilter, setActiveFilter] = useState<{
        key: string
        label: string
    }>(MEETING_FILTER_LIST[0])

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
            <MeetingHeader meeting={MockMeetingList[0]} />

            <FilterList
                filterList={MEETING_FILTER_LIST}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                className="self-start"
            />

            <div className="flex w-full flex-col gap-16">
                {MockMeetingList.filter(
                    meeting =>
                        (activeFilter.key === 'recent' &&
                            !meeting.isCompleted) ||
                        (activeFilter.key === 'past' && meeting.isCompleted)
                ).map((meeting, idx) => (
                    <MeetingCard
                        key={idx}
                        meeting={meeting}
                        onClick={() => {
                            console.log('clicked')
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
