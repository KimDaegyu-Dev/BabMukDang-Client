import { COLORS } from '@/constants/colors'
import { DeleteIcon } from '@/assets/icons'
import RandomCoupon from '@/assets/icons/random_coupon_graphic.svg?react'

import { BaseModal, type BaseModalChildrenProps } from '@/components'

type ProfileModalProps = {
    preferredMenus: string[]
    cantEat: string[]
}

export function ProfileModal({
    id,
    onClose,
    onAccept,
    preferredMenus,
    cantEat
}: BaseModalChildrenProps & ProfileModalProps) {
    return (
        <BaseModal
            id={id}
            onClose={onClose}
            onAccept={onAccept}>
            <ProfileModalContent
                preferredMenus={preferredMenus}
                cantEat={cantEat}
            />
        </BaseModal>
    )
}

function ProfileModalContent({
    onClose,
    preferredMenus,
    cantEat
}: BaseModalChildrenProps & ProfileModalProps) {
    return (
        <div className="rounded-16 relative bg-white px-16 py-16">
            <button
                onClick={onClose}
                className="absolute top-16 right-16"
                aria-label="닫기">
                <DeleteIcon
                    strokecolor={COLORS.gray4}
                    className="size-20"
                />
            </button>
            <div className="flex flex-col gap-32">
                {/* 좋아하는 메뉴 */}
                <div className="flex flex-col items-baseline gap-9">
                    <span className="text-caption-medium text-primary-500">
                        좋아해요!
                    </span>
                    <div className="flex flex-wrap justify-center gap-4">
                        {preferredMenus.map((menu, index) => (
                            <span
                                key={index}
                                className="text-caption-10 text-primary-500 bg-primary-200 rounded-full border px-8 py-3"
                                style={{ fontSize: 13 }}>
                                {menu}
                            </span>
                        ))}
                    </div>
                </div>
                {/* 못먹는 메뉴 */}
                <div className="flex flex-col items-baseline gap-9">
                    <span className="text-caption-medium text-gray-6">
                        못먹어요!
                    </span>
                    <div className="flex flex-wrap justify-center gap-4">
                        {cantEat.map((menu, index) => (
                            <span
                                key={index}
                                className="text-caption-10 text-gray-4 bg-gray-2 rounded-full border px-8 py-3"
                                style={{ fontSize: 13 }}>
                                {menu}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
