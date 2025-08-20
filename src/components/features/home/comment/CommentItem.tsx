import { CommentIcon } from '@/assets/icons'
import { KebabButton } from '@/components'

export function CommentItem({
    profileImageUrl,
    name,
    comment,
    createdAt
}: {
    profileImageUrl: string
    name: string
    comment: string
    createdAt: string
}) {
    return (
        <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-row items-center gap-6">
                        <img
                            src={profileImageUrl}
                            alt="profile"
                            className="size-20 rounded-full"
                        />
                        <span className="text-body2-semibold text-black">
                            {name}
                        </span>
                    </div>
                    <span className="text-body1-medium text-gray-7">
                        {comment}
                    </span>
                </div>
                <span className="text-caption-regular text-gray-3">
                    {createdAt}
                </span>
            </div>
            <div className="flex flex-row items-center gap-4">
                <CommentIcon />
                <KebabButton onClick={() => {}} />
            </div>
        </div>
    )
}
