import { Link } from 'react-router-dom'

import { ProfileDefaultIcon } from '@/assets/icons'

export function RecieveInvitationList() {
    return (
        <div className="rounded-12 shadow-drop-1 flex w-full flex-col gap-16 bg-white p-16">
            {/* 상단 */}
            <div className="flex flex-row items-center justify-between">
                <span className="text-body1-semibold text-gray-8">
                    받은 초대장
                </span>
                <span className="text-caption-medium text-right text-gray-300">
                    더보기 +
                </span>
            </div>
            {/* 하단 */}
            <div className="flex flex-row justify-between">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Link
                        to="/read-invitation"
                        className="flex flex-col items-center justify-center gap-4">
                        <ProfileDefaultIcon className="size-50" />
                        <span className="text-caption-medium text-gray-5 text-center">
                            김대규
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
