import { PostCardContent, PostCardHeader, PostCardFooter } from '@/components'
import { useLikeArticle } from '@/query'
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
