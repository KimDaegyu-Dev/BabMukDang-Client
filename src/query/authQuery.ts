import { logout } from '@/apis/auth'
import { useAuthStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
    const navigate = useNavigate()
    const { logout: logoutToken } = useAuthStore()
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {}
    })
}
