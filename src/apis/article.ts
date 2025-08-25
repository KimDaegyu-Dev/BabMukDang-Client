import { client } from './client'
import {
    ArticleDetailResponse,
    ArticlePostRequest,
    CommentPostRequest,
    CommentResponse,
    LikePostResponse,
    PageArticleSummaryResponse,
    BaseResponse
} from './dto'

export const getArticle = async (
    articleId: number
): Promise<ArticleDetailResponse> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/articles/${articleId}`
    )
    return res.data as ArticleDetailResponse
}

export const getArticleComments = async (
    articleId: number
): Promise<CommentResponse[]> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/articles/${articleId}/comments`
    )
    return res.data as CommentResponse[]
}

export const getHomeArticles =
    async (): Promise<PageArticleSummaryResponse> => {
        const res = await client.get(
            `${import.meta.env.VITE_BASE_API_URL}/articles/home`
        )
        return res.data as PageArticleSummaryResponse
    }

export const getArticlesByAuthor = async (
    authorId: number
): Promise<PageArticleSummaryResponse> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/articles/by-author/${authorId}`
    )
    return res.data as PageArticleSummaryResponse
}

export const postArticle = async (data: ArticlePostRequest): Promise<void> => {
    console.log(data)
    const res = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/articles`,
        data
    )
    return res.data as void
}

export const likeArticle = async (
    articleId: number
): Promise<LikePostResponse> => {
    const res = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/articles/${articleId}/like`
    )
    return res.data
}

export const postArticleComment = async (
    articleId: number,
    data: CommentPostRequest
): Promise<void> => {
    const res = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/articles/${articleId}/comments`,
        data
    )
    return res.data as void
}

export const deleteArticle = async (articleId: number): Promise<void> => {
    const res = await client.delete(
        `${import.meta.env.VITE_BASE_API_URL}/articles/${articleId}`
    )
    return res.data
}

export const deleteArticleComment = async (
    commentId: number
): Promise<void> => {
    const res = await client.delete(
        `${import.meta.env.VITE_BASE_API_URL}/articles/comments/${commentId}`
    )
    return res.data as void
}

export const getArticlesByMember = async (
    memberId: number
): Promise<BaseResponse<PageArticleSummaryResponse>> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/members/${memberId}/articles`,
        {
            params: {
                page: 0
            }
        }
    )
    return res.data as BaseResponse<PageArticleSummaryResponse>
}

export const getMyArticles = async (): Promise<
    BaseResponse<PageArticleSummaryResponse>
> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/members/me/articles`,
        {
            params: {
                page: 0
            }
        }
    )
    return res.data as BaseResponse<PageArticleSummaryResponse>
}
