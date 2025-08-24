import { client } from './client'
import { BaseResponse, TokenResponse } from './dto'

export const login = async (
    code: string
): Promise<BaseResponse<TokenResponse>> => {
    const res = await client.get(`/auth2/authorization/kakao`)
    console.log(res.data)
    return res.data
}

export const logout = async (): Promise<BaseResponse<void>> => {
    const res = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/auth/logout`
    )
    return res.data
}

export const refresh = async (
    data: TokenResponse
): Promise<BaseResponse<TokenResponse>> => {
    const res = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
        data
    )
    return res.data
}
