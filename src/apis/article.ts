import { client } from './client'
import {
    ArticleDetailResponse,
    ArticlePostRequest,
    BaseResponse,
    CommentResponse,
    PageArticleSummaryResponse
} from './dto'

export const getArticle = async (
    articleId: number
): Promise<BaseResponse<ArticleDetailResponse>> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/articles/${articleId}`
    )
    return res.data
}

export const getArticleComments = async (
    articleId: number
): Promise<BaseResponse<CommentResponse[]>> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/articles/${articleId}/comments`
    )
    return res.data
}

export const getHomeArticles = async (): Promise<
    BaseResponse<PageArticleSummaryResponse>
> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/articles/home`
    )
    return res.data
}

export const getArticlesByAuthor = async (
    authorId: number
): Promise<BaseResponse<PageArticleSummaryResponse>> => {
    const res = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/articles/by-author/${authorId}`
    )
    return res.data
}

export const postArticle = async (
    data: ArticlePostRequest
): Promise<BaseResponse<void>> => {
    console.log(data)
    const res = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/articles`,
        data
    )
    return res.data
}
