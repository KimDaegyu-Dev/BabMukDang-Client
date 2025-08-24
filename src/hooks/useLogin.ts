import { login } from '@/apis'
import { useEffect } from 'react'

export const useLogin = () => {
    useEffect(() => {
        const loginAsync = async () => {
            try {
                const tokenData = await login()
                console.log('tokenData', tokenData)
            } catch (error) {
                // 에러 처리
            }
        }
        loginAsync()
    }, [])
}
