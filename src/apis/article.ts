import { client } from './client'
import {
    ArticleDetailResponse,
    CommentResponse,
    PageArticleSummaryResponse
} from './dto'

export const getArticle = async (
    articleId: number
): Promise<ArticleDetailResponse> => {
    const res = await client.get(`/api/v1/articles/${articleId}`)
    return res.data
}

export const getArticleComments = async (
    articleId: number
): Promise<CommentResponse[]> => {
    const res = await client.get(`/api/v1/articles/${articleId}/comments`)
    return res.data
}

export const getHomeArticles =
    async (): Promise<PageArticleSummaryResponse> => {
        const res = await client.get(`/api/v1/articles/home`)
        return res.data
    }

export const getArticlesByAuthor = async (
    authorId: number
): Promise<PageArticleSummaryResponse> => {
    const res = await client.get(`/api/v1/articles/by-author/${authorId}`)
    return res.data
}
