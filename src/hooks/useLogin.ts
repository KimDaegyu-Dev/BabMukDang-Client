import { login } from '@/lib/login'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

export const useLogin = (username: string, userId: string) => {
    const { setTokens, setUsername, setUserId } = useAuthStore()
    useEffect(() => {
        const loginAsync = async (username: string, userId: string) => {
            try {
                const tokenData = await login(username, userId)
                console.log('tokenData', tokenData)
                setTokens({
                    accessToken: tokenData,
                    refreshToken: tokenData
                })
                setUsername(username)
                setUserId(userId)
            } catch (error) {
                // 에러 처리
            }
        }
        loginAsync(username, userId)
    }, [])
}
