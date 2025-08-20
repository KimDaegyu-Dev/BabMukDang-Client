import { CommentItem, ReplyCommentItem } from '@/components'

type Comment = {
    id: number
    profileImageUrl: string
    name: string
    comment: string
    createdAt: string
    isReply: boolean
}

export function CommentList({ comments }: { comments: Comment[] }) {
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-row items-center gap-4">
                <span className="text-title2-semibold text-gray-5">댓글</span>
                <span className="text-body2-medium text-gray-3">
                    · {comments.length}
                </span>
            </div>
            <div className="flex flex-col gap-15">
                {comments.map(comment =>
                    comment.isReply ? (
                        <ReplyCommentItem
                            key={comment.id}
                            profileImageUrl={comment.profileImageUrl}
                            name={comment.name}
                            comment={comment.comment}
                            createdAt={comment.createdAt}
                        />
                    ) : (
                        <>
                            <Separator />
                            <CommentItem
                                key={comment.id}
                                profileImageUrl={comment.profileImageUrl}
                                name={comment.name}
                                comment={comment.comment}
                                createdAt={comment.createdAt}
                            />
                        </>
                    )
                )}
            </div>
        </div>
    )
}

const Separator = () => {
    return <div className="border-gray-2 -ml-20 h-0 w-screen border-b" />
}
