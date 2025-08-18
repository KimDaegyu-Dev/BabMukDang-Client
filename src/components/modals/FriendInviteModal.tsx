import { COLORS } from '@/constants/colors'
import { DeleteIcon, KakaoIcon, ShareIcon } from '@/assets/icons'
import RandomCoupon from '@/assets/random_coupon_graphic.svg?react'

import { BaseModal, type BaseModalChildrenProps } from '@/components'

export function FriendInviteModal({
    id,
    onClose,
    onAccept
}: BaseModalChildrenProps) {
    return (
        <BaseModal
            id={id}
            onClose={onClose}
            onAccept={onAccept}>
            <FriendInviteModalContent />
        </BaseModal>
    )
}

function FriendInviteModalContent({ onClose }: BaseModalChildrenProps) {
    return (
        <div className="rounded-t-16 w-full bg-white px-20 pt-20 pb-40">
            <div className="flex w-full flex-col items-center gap-20">
                <button
                    onClick={onClose}
                    className="self-end"
                    aria-label="닫기">
                    <DeleteIcon strokecolor={COLORS.gray4} />
                </button>
                <div className="flex w-full flex-col items-center gap-23">
                    <span className="text-title1-semibold text-gray-8 text-center">
                        친구 초대해서 랜덤 쿠폰 받고 같이 밥 먹어요
                    </span>
                    <div className="flex w-full flex-col items-center gap-30">
                        <RandomCoupon />
                        <div className="flex w-full flex-col gap-10">
                            <CopyLinkButton />
                            <KakaoShareButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CopyLinkButton({
    className,
    onClick
}: {
    className?: string
    onClick?: () => void
}) {
    return (
        <button
            className={`bg-gray-8 flex w-full cursor-pointer items-center justify-center gap-12 rounded-full py-14 pr-16 pl-17 ${className} `}
            onClick={onClick}
            onTouchEnd={onClick}>
            <ShareIcon />
            <span className="text-body1-semibold text-gray-1">
                초대 링크 복사하기
            </span>
        </button>
    )
}

function KakaoShareButton({
    className,
    onClick
}: {
    className?: string
    onClick?: () => void
}) {
    return (
        <button
            className={`flex w-full cursor-pointer items-center justify-center gap-12 rounded-full bg-[#FEDC2C] py-14 pr-16 pl-17 ${className} `}
            onClick={onClick}
            onTouchEnd={onClick}>
            <KakaoIcon />
            <span className="text-body1-semibold text-gray-8">
                초대장 보내러 가기
            </span>
        </button>
    )
}
