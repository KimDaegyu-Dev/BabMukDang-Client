import { MutalButtonSmall } from '@/components'

export function CloseAnnouncementButton() {
    const handleAddAnnouncement = () => {
        console.log('Add announcement button clicked')
    }

    return (
        <MutalButtonSmall
            text="공고 마감하기"
            onClick={handleAddAnnouncement}></MutalButtonSmall>
    )
}
