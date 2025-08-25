import { create } from 'zustand'

export const useAuthStore = create<{
    accessToken: string | null
    refreshToken: string | null
    username: string | null
    userId: string | null
    profile: {
        profileImageUrl: string | null
        userName: string | null
        bio: string | null
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
}>(set => ({
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
            userId: null
        })
    }
}))
