import { CommentResponse } from '@/apis/dto'
import { CommentItem, ReplyCommentItem } from '@/components'
import { MockPostList } from '@/constants/mockData'
import { useGetArticleComments } from '@/query'
import { useEffect, useState } from 'react'

interface Comment {
    commentId: number
    authorId: number
    authorUsername: string
    parentCommentId: number | null
    content: string
    createdAt: string
    profileImageUrl?: string
    replies?: Comment[] // 트리 변환 후에만 생김
}

export function CommentList({
    postId,
    onClickReply
}: {
    postId: number
    onClickReply: (commentId: number) => void
}) {
    const { data: commentsData, error } = useGetArticleComments(postId)
    const [comments, setComments] = useState<Comment[]>([])
    useEffect(() => {
        if (commentsData) {
            setComments(commentsData as Comment[])
        }
        setComments(buildCommentTree(MockPostList[postId - 1].comments))
        console.log(buildCommentTree(MockPostList[postId - 1].comments))
    }, [commentsData])
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-row items-center gap-4">
                <span className="text-title2-semibold text-gray-5">댓글</span>
                <span className="text-body2-medium text-gray-3">
                    · {comments.length}
                </span>
            </div>
            <div className="flex flex-col gap-15">
                {comments.map(comment => (
                    <>
                        <CommentItem
                            key={comment.commentId}
                            profileImageUrl={comment?.profileImageUrl}
                            commentAuthorName={comment.authorUsername}
                            comment={comment.content}
                            createdAt={comment.createdAt}
                            authorId={comment.authorId}
                            onClickReply={() => onClickReply(comment.commentId)}
                        />
                        {comment?.replies?.length &&
                            comment.replies.length > 0 &&
                            comment.replies.map(reply => (
                                <ReplyCommentItem
                                    key={reply.commentId}
                                    profileImageUrl={reply?.profileImageUrl}
                                    commentAuthorName={reply.authorUsername}
                                    comment={reply.content}
                                    createdAt={reply.createdAt}
                                    authorId={reply.authorId}
                                    onClickReply={() =>
                                        onClickReply(reply.commentId)
                                    }
                                />
                            ))}

                        <Separator />
                    </>
                ))}
            </div>
        </div>
    )
}

const Separator = () => {
    return <div className="border-gray-2 -ml-20 h-0 w-screen border-b" />
}

function buildCommentTree(comments: CommentResponse[]) {
    const map: Record<number, Comment> = {}
    const roots: Comment[] = []

    comments.forEach(comment => {
        map[comment.commentId] = { ...comment, replies: [] }
    })

    comments.forEach(comment => {
        if (comment.parentCommentId !== 0) {
            map[comment.parentCommentId].replies?.push(map[comment.commentId])
        } else {
            roots.push(map[comment.commentId])
        }
    })

    return roots
}
