import { client } from '@/apis/client'

export const login = async (username: string, userId: string) => {
    try {
        const response = await client.get('/', {
            params: { username, userId }
        })

        // store 업데이트는 컴포넌트에서 처리
        return response.data
    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}
