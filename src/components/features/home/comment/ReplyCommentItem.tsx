import { CommentIcon, RepplyIcon } from '@/assets/icons'
import { KebabButton } from '@/components'

export function ReplyCommentItem({
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
        <div className="flex flex-row items-start justify-between gap-4">
            <RepplyIcon />
            <div className="rounded-12 flex flex-grow flex-row items-start justify-between bg-white py-12 pr-8 pl-16">
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
        </div>
    )
}
