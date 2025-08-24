import { PostCardContent, PostCardHeader, PostCardFooter } from '@/components'
import { useLikeArticle } from '@/query'
import { useNavigate } from 'react-router-dom'
type Post = {
    postId: number
    author: {
        id: number
        username: string
    }
    tags: string[]
    postedAt: string
    postImageUrl: string
    postType: 'mornings' | 'lunch' | 'dinner'
    restaurantInfo: RestaurantInfo
}

type RestaurantInfo = {
    placeId: string
    placeName: string
    addressName: string
    roadAddressName: string
    phoneNumber: string
    placeUrl: string
    distance?: string
    categoryGroupCode: string
    categoryGroupName: string
    categoryName: string
    x: number
    y: number
}

export function PostCard({
    post,
    isComment = false
}: {
    post: Post
    isComment?: boolean
}) {
    return (
        <div className="flex w-full flex-col gap-12">
            <PostCardHeader
                author={post.author}
                tags={post.tags}
                postedAt={post.postedAt}
            />
            <PostCardContent
                postImageUrl={post.postImageUrl}
                postId={post.postId}
                postType={post.postType}
                isComment={isComment}
            />
            <PostCardFooter restaurantInfo={post.restaurantInfo} />
        </div>
    )
}
