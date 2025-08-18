import axios from 'axios'
import { client } from './client'
import { BaseResponse, TokenResponse } from './dto'

export const login = async (
    code: string
): Promise<BaseResponse<TokenResponse>> => {
    const res = await axios.get(
        `http://15.164.29.199:8080/oauth2/authorization/kakao?code=${code}`
    )
    console.log(res.data)
    return res.data
}

export const logout = async (): Promise<BaseResponse<void>> => {
    const res = await client.post('/auth/logout')
    return res.data
}

export const refresh = async (
    data: TokenResponse
): Promise<BaseResponse<TokenResponse>> => {
    const res = await client.post('/auth/refresh', data)
    return res.data
}
