import { create } from 'zustand'

export const useAuthStore = create<{
    accessToken: string | null
    refreshToken: string | null
    username: string | null
    userId: string | null

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

    logout: () => void
}>(set => ({
    accessToken: null,
    refreshToken: null,
    username: null,
    userId: null,

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

    logout: () => {
        set({
            accessToken: null,
            refreshToken: null,
            username: null,
            userId: null
        })
    }
}))
