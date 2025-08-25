import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create<{
    accessToken: string | null
    refreshToken: string | null
    username: string | null
    userId: string | null
    profile: {
        profileImageUrl: string | null
        userName: string | null
        bio: string | null
        meetingCount: number | null
    }
    setTokens: ({
        accessToken,
        refreshToken
    }: {
        accessToken: string
        refreshToken: string
    }) => void
    clearTokens: () => void
    setUsername: (username: string) => void
    setUserId: (userId: string) => void
    setProfile: (profile: {
        profileImageUrl: string | null
        userName: string | null
        bio: string | null
        meetingCount: number | null
    }) => void

    logout: () => void
}>(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            username: null,
            userId: null,
            profile: {
                profileImageUrl: null,
                userName: null,
                bio: null,
                meetingCount: null
            },
            setTokens: ({
                accessToken,
                refreshToken
            }: {
                accessToken: string
                refreshToken: string
            }) => set({ accessToken, refreshToken }),
            clearTokens: () => set({ accessToken: null, refreshToken: null }),
            setUsername: (username: string) => set({ username }),
            setUserId: (userId: string) => set({ userId }),
            setProfile: (profile: {
                profileImageUrl: string | null
                userName: string | null
                bio: string | null
                meetingCount: number | null
            }) => set({ profile }),
            logout: () => {
                set({
                    accessToken: null,
                    refreshToken: null,
                    username: null,
                    userId: null,
                    profile: {
                        profileImageUrl: null,
                        userName: null,
                        bio: null,
                        meetingCount: null
                    }
                })
            }
        }),
        {
            name: 'auth-storage', // localStorage에 저장될 키 이름
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                username: state.username,
                userId: state.userId,
                profile: state.profile
            })
        }
    )
)
