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
