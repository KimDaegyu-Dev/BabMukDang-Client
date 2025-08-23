import { ModalTrigger, MutalButtonSmall } from '@/components'

export function JoinButton({ disabled }: { disabled?: boolean }) {
    return (
        <ModalTrigger
            forId="join-complete-modal"
            disabled={disabled}>
            <MutalButtonSmall
                text="참여하기"
                className={`${
                    disabled ? 'bg-gray-4 cursor-not-allowed' : 'bg-gray-7'
                }`}
            />
        </ModalTrigger>
    )
}
