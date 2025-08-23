import { client } from '@/apis/client'
import axios from 'axios'

export const login = async (username: string, userId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_WEBSOCKET_URL}/`,
            {
                params: { username, userId }
            }
        )

        // store 업데이트는 컴포넌트에서 처리
        return response.data
    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}
