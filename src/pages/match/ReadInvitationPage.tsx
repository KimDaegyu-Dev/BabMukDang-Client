import { InvitationCard } from '@/components'
import { CardBobGraphic } from '@/assets/graphics'
import { useHeader } from '@/hooks'
import { useEffect } from 'react'

export function ReadInvitationPage() {
    const { setTitle, resetHeader } = useHeader()
    useEffect(() => {
        setTitle('초대장')
        return () => {
            resetHeader()
        }
    }, [])
    return (
        <div className="flex h-full w-full flex-col justify-center gap-18">
            <InvitationCard
                Graphic={<CardBobGraphic />}
                bgColor="bg-gradient-to-b to-[#FF5E27] from-[#FFA484]"
                text="우리 같이 밥 먹으러 갈래?"
                from="초대장"
            />
            <div className="flex flex-row gap-10">
                <AcceptButton
                    text="수락하기"
                    onClick={() => {}}
                />
                <RejectButton
                    text="거절하기"
                    onClick={() => {}}
                />
            </div>
        </div>
    )
}

const AcceptButton = ({
    text,
    onClick
}: {
    text: string
    onClick: () => void
}) => {
    return (
        <button
            className={`rounded-12 bg-primary-100 flex w-full items-center justify-center py-14`}
            onClick={onClick}>
            <span className="text-title2-semibold text-primary-500">
                {text}
            </span>
        </button>
    )
}

const RejectButton = ({
    text,
    onClick
}: {
    text: string
    onClick: () => void
}) => {
    return (
        <button
            className={`rounded-12 bg-gray-2 flex w-full items-center justify-center py-14`}
            onClick={onClick}>
            <span className="text-title2-semibold text-gray-4">{text}</span>
        </button>
    )
}
