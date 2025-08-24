import { useEffect, useRef, useState } from 'react'
import { PostCard, CommentList, ChatInput } from '@/components'
import { useHeader, useBottomNav } from '@/hooks'
import { useLocation, useParams } from 'react-router-dom'
import { useCommentArticle } from '@/query'

export function CommentPage() {
    const { resetHeader, setTitle } = useHeader()
    const { hideBottomNav, resetBottomNav } = useBottomNav()
    const { postId } = useParams()
    const [newMessage, setNewMessage] = useState('')
    const [replyCommentId, setReplyCommentId] = useState<number | null>(null)
    const { mutate: sendMessage } = useCommentArticle(
        () => {
            console.log('success')
        },
        e => {
            console.log('error', e)
        }
    )
    useEffect(() => {
        setTitle('게시물')
        hideBottomNav()
        return () => {
            resetHeader()
            resetBottomNav()
        }
    }, [])

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    const handleSendMessage = () => {
        sendMessage({
            articleId: Number(postId),
            comment: {
                content: newMessage,
                parentCommentId: replyCommentId ?? undefined
            }
        })
        setNewMessage('')
        setReplyCommentId(null)
    }

    const handleReply = (commentId: number) => {
        console.log('reply', commentId)
        setReplyCommentId(commentId)
    }

    return (
        <div className="flex flex-col gap-48 pt-16">
            {/* <PostCard
                post={post}
                isComment={true}
            /> */}
            {/* 댓글 영역 */}
            <CommentList
                postId={Number(postId)}
                onClickReply={handleReply}
            />
            <ChatInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleKeyPress={handleKeyPress}
                handleSendMessage={handleSendMessage}
            />
        </div>
    )
}
