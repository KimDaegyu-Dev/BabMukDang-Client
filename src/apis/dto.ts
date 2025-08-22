export interface BaseResponse<T> {
    code: number
    message: string
    data: T
}
export interface Post {
    targetCount: number
    meetingAt: string
    location: string
    message: string
}

export interface PostRequest extends Post {}
export interface PostResponse extends Post {
    authorName: string
    createdAt: string
    participantNames: string[]
}

export interface TokenResponse {
    accessToken: string
    refreshToken: string
    accessTokenMaxAge: number
}
export interface PostResponse {
    authorName: string
    createdAt: string
    message: string
    meetingAt: string
    location: string
    participantNames: string[]
}

export interface CommentResponse {
    commentId: number
    authorId: number
    authorUsername: string
    parentCommentId: number
    content: string
    createdAt: string
}
export interface ArticleSummaryResponse {
    articleId: number
    authorId: number
    authorUsername: string
    imageUrl: string
    mealDate: string
    mealTime: LocalTime
    restaurantName: string
    likeCount: number
    commentCount: number
    likedByMe: boolean
    createdAt: string
    expiresAt: string
    taggedMemberIds: number[]
}

interface LocalTime {
    hour: number
    minute: number
    second: number
    nano: number
}

interface SortObject {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

interface PageableObject {
    offset: number
    sort: SortObject
    paged: boolean
    pageNumber: number
    pageSize: number
    unpaged: boolean
}
export interface PageArticleSummaryResponse {
    totalElements: number
    totalPages: number
    first: boolean
    size: number
    content: ArticleSummaryResponse[]
    number: number
    sort: SortObject
    numberOfElements: number
    pageable: PageableObject
    last: boolean
    empty: boolean
}

export interface RestaurantInfo {
    placeId: string
    placeName: string
    addressName: string
    roadAddressName: string
    phoneNumber: string
    placeUrl: string
    categoryGroupCode: string
    categoryGroupName: string
    categoryName: string
    x: number
    y: number
}

export interface ArticleDetailResponse {
    articleId: number
    authorId: number
    authorUsername: string
    imageUrl: string
    mealDate: string
    mealTime: LocalTime
    restaurant: RestaurantInfo
    likeCount: number
    commentCount: number
    likedByMe: boolean
    createdAt: string
    expiresAt: string
}
