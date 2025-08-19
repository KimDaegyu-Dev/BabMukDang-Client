import { DeleteIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'

import { BaseModal, type BaseModalChildrenProps } from '@/components'

type CouponNotifyProps = {
    restaurantName: string
    condition: string
    serviceItem: string
    canUseAgain: boolean
    expirationDate: string
    couponType: string
}

export function CouponModal({
    open,
    id,
    onClose,
    onAccept,
    restaurantName,
    condition,
    serviceItem,
    canUseAgain,
    expirationDate,
    couponType
}: CouponNotifyProps & BaseModalChildrenProps) {
    return (
        <BaseModal
            open={open}
            id={id}
            onClose={onClose}
            onAccept={onAccept}>
            <CouponModalContent
                restaurantName={restaurantName}
                condition={condition}
                serviceItem={serviceItem}
                canUseAgain={canUseAgain}
                expirationDate={expirationDate}
                couponType={couponType}
            />
        </BaseModal>
    )
}

function CouponModalContent({
    onClose,
    onAccept,
    restaurantName,
    condition,
    serviceItem,
    canUseAgain,
    expirationDate,
    couponType
}: BaseModalChildrenProps & CouponNotifyProps) {
    return (
        <div className="shadow-drop-1 rounded-16 relative mx-auto w-full max-w-400 bg-white px-20 py-24">
            {/* Close icon */}
            <button
                onClick={onClose}
                className="absolute top-16 right-16"
                aria-label="닫기">
                <DeleteIcon strokecolor={COLORS.gray4} />
            </button>
            {/* 쿠폰 정보 */}
            <div className="flex w-full flex-col items-center gap-16">
                {/* 상단 음식점 정보 */}
                <div className="flex w-full items-center justify-center gap-12">
                    <img className="rounded-5 size-62 flex-none" />
                    <div className="flex flex-col items-center gap-6">
                        <span className="text-title2-semibold text-center text-black">
                            {restaurantName}
                        </span>
                        <div className="flex items-center gap-6">
                            <span className="text-body1-semibold text-gray-7">
                                {serviceItem}
                            </span>
                            {/* todo: 쿠폰 타입 칩 추가 */}
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col items-center gap-10">
                    {/* 쿠폰 이미지 */}
                    <img className="h-106 w-full flex-none" />
                    {/* 하단 쿠폰 정보 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-caption-medium text-gray-4">
                            사용조건: {condition}
                        </span>
                        <span className="text-caption-medium text-gray-4">
                            사용기간: {expirationDate}
                        </span>
                        <span className="text-caption-medium text-gray-4">
                            중복사용 {canUseAgain ? 'O' : 'x'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
