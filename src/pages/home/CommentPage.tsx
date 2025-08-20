import { useEffect } from 'react'
import { PostCard, CommentList, ChatInput } from '@/components'
import { useHeader, useBottomNav } from '@/hooks'
import { useLocation } from 'react-router-dom'

export function CommentPage() {
    const { resetHeader, setTitle } = useHeader()
    const { hideBottomNav, resetBottomNav } = useBottomNav()
    const { post } = useLocation().state
    useEffect(() => {
        setTitle('게시물')
        hideBottomNav()
        return () => {
            resetHeader()
            resetBottomNav()
        }
    }, [])
    return (
        <div className="flex flex-col gap-48 pt-16">
            <PostCard
                post={post}
                isComment={true}
            />
            {/* 댓글 영역 */}
            <CommentList comments={post.comments} />
            <ChatInput
                inputRef={() => {}}
                newMessage={''}
                setNewMessage={() => {}}
                handleKeyPress={() => {}}
                handleSendMessage={() => {}}
            />
        </div>
    )
}
