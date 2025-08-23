import { BottomSheet } from '../BottomSheet'
import { CloseAnnouncementButton } from './CloseAnnouncementButton'
import { AddAnnouncementCard } from './AddAnnouncementCard'
import { KebabButton } from '@/components'

export function AnnouncementBottomSheet() {
    return (
        <BottomSheet initialExposure={75}>
            <div className="relative flex h-full w-full flex-col items-center justify-baseline gap-35 bg-gradient-to-b from-white to-[#FED9CB] pt-12">
                <KebabButton
                    className="absolute top-8 right-20"
                    onClick={() => {}}
                />
                <span className="text-body1-semibold text-primary-main">
                    나의 공고
                </span>
                <div className="flex w-280 flex-col gap-12">
                    <AddAnnouncementCard />
                    {/* <CloseAnnouncementCard
                        announcement={MockAnnouncements[0]}
                    /> */}
                    <CloseAnnouncementButton />
                </div>
            </div>
        </BottomSheet>
    )
}
