import {
    HeartIcon,
    CommentIcon,
    HeartFilledIcon,
    HeartWhiteIcon
} from '@/assets/icons'
import { useLikeArticle } from '@/query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const PostCardContent = ({
    postImageUrl,
    postId,
    postType,
    isComment
}: {
    postImageUrl: string
    postId: number
    postType: 'mornings' | 'lunch' | 'dinner'
    isComment: boolean
}) => {
    const [isLiked, setIsLiked] = useState(false)
    const onSuccess = () => {
        setIsLiked(true)
    }
    const onError = (e: Error) => {
        setIsLiked(false)
    }
    const { mutate: likeArticle, isPending: isLikePending } = useLikeArticle(
        onSuccess,
        onError
    )
    const onClickLike = () => {
        likeArticle({ articleId: postId })
    }

    const navigate = useNavigate()
    const onClickComment = () => {
        navigate(`/post/${postId}`)
    }
    return (
        <div className="relative -ml-20 aspect-square w-screen bg-gray-200">
            <img
                src={postImageUrl}
                alt="restaurant"
                className="h-full w-full object-cover"
            />
            <PostTypeChip
                postType={postType}
                className="absolute top-16 left-20 z-10"
            />
            <div className="absolute bottom-16 left-16 flex flex-row items-center gap-14">
                <div className="flex size-40 items-center justify-center rounded-full bg-white/30">
                    {isLiked ? (
                        <div onClick={onClickLike}>
                            <HeartFilledIcon />
                        </div>
                    ) : (
                        <div onClick={onClickLike}>
                            <HeartWhiteIcon />
                        </div>
                    )}
                </div>
                {!isComment && (
                    <div
                        className="flex size-40 items-center justify-center rounded-full bg-white/30"
                        onClick={onClickComment}>
                        <CommentIcon />
                    </div>
                )}
            </div>
        </div>
    )
}

const PostTypeChip = ({
    postType,
    className
}: {
    postType: 'mornings' | 'lunch' | 'dinner'
    className?: string
}) => {
    const postTypeText = {
        mornings: '아침',
        lunch: '점심',
        dinner: '저녁'
    }
    return (
        <div
            className={`flex items-center justify-center rounded-full bg-gray-100 px-12 py-4 ${className}`}>
            <span className="text-caption-medium text-gray-700">
                {postTypeText[postType]}
            </span>
        </div>
    )
}
