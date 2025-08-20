import {
    ProfileDefaultIcon,
    KebabIcon,
    HeartIcon,
    CommentIcon,
    LocationIcon
} from '@/assets/icons'
import { KebabButton, TagPerson } from '@/components'
import { useNavigate } from 'react-router-dom'
type Post = {
    postId: number
    author: string
    tags: string[]
    postedAt: string
    postImageUrl: string
    postType: 'mornings' | 'lunch' | 'dinner'
    restaurantInfo: RestaurantInfo
}

type RestaurantInfo = {
    restaurantImageUrl: string
    restaurantName: string
    restaurantType: string
    restaurantLocation: string
    restaurantDistance: string
}

export function PostCard({
    post,
    isComment
}: {
    post: Post
    isComment: boolean
}) {
    const navigate = useNavigate()
    const onClickComment = () => {
        navigate(`/post/${post.postId}`, {
            state: { post: post }
        })
    }
    return (
        <div className="flex w-full flex-col gap-12">
            <PostCardHeader
                author={post.author}
                tags={post.tags}
                postedAt={post.postedAt}
            />
            <PostCardContent
                postImageUrl={post.postImageUrl}
                postType={post.postType}
                isComment={isComment}
                onClickComment={onClickComment}
            />
            <PostCardFooter restaurantInfo={post.restaurantInfo} />
        </div>
    )
}
const PostCardHeader = ({
    author,
    tags,
    postedAt
}: {
    author: string
    tags: string[]
    postedAt: string
}) => {
    return (
        <div className="flex w-full flex-row items-center justify-between">
            {/* 프로필 태그 */}
            <div className="flex flex-row gap-8">
                {/* 프로필 */}
                <div className="flex flex-shrink-0 flex-row items-center gap-10">
                    <ProfileDefaultIcon />
                    <span className="text-body1-bold text-black">{author}</span>
                </div>
                {/* 태그 */}
                <div className="flex flex-row flex-wrap items-center gap-8">
                    {tags.map(tag => (
                        <TagPerson name={tag} />
                    ))}
                </div>
            </div>
            {/* 시간 케밥 */}
            <div className="flex flex-row items-end gap-6">
                {/* 시간 */}
                <span className="text-caption-medium text-gray-300">
                    {postedAt}
                </span>
                {/* 케밥 버튼 */}
                <KebabButton onClick={() => {}} />
            </div>
        </div>
    )
}
const PostCardContent = ({
    postImageUrl,
    postType,
    isComment,
    onClickComment
}: {
    postImageUrl: string
    postType: 'mornings' | 'lunch' | 'dinner'
    isComment: boolean
    onClickComment: () => void
}) => {
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
                    <HeartIcon />
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
const PostCardFooter = ({
    restaurantInfo
}: {
    restaurantInfo: RestaurantInfo
}) => {
    return (
        <div className="shadow-drop-1 rounded-12 flex h-72 w-full flex-row items-center gap-12 bg-white">
            {/* Left: Restaurant Image */}
            <img
                src={restaurantInfo.restaurantImageUrl}
                alt="restaurant"
                className="rounded-l-12 h-72 w-72 object-cover"
            />
            {/* Center: Info */}
            <div className="flex w-188 flex-col justify-center gap-6">
                <div className="flex flex-row items-center gap-8">
                    <span className="text-body1-bold">
                        {restaurantInfo.restaurantName}
                    </span>
                    <span className="text-caption-medium text-gray-3">
                        {restaurantInfo.restaurantType}
                    </span>
                </div>
                <div className="flex w-full flex-row items-center gap-6">
                    {/* Location icon and distance */}
                    <div className="flex flex-row items-end gap-4">
                        <span className="flex items-center">
                            <LocationIcon className="h-16 w-16" />
                        </span>
                        <span className="text-caption-medium text-gray-5">
                            {restaurantInfo.restaurantDistance}
                        </span>
                    </div>
                    <span className="text-caption-medium text-gray-6">
                        {restaurantInfo.restaurantLocation}
                    </span>
                </div>
            </div>
        </div>
    )
}
