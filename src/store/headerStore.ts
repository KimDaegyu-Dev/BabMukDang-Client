import { create } from 'zustand'

export interface HeaderConfig {
    visible: boolean
    left?: React.ReactNode
    center?: React.ReactNode
    right?: React.ReactNode
    showLeftButton?: boolean
    title?: string
    showRightButton?: boolean
    showCenterElement?: boolean
}

interface HeaderStore {
    config: HeaderConfig
    updateHeader: (newConfig: Partial<HeaderConfig>) => void
    hideHeader: () => void
    showHeader: () => void
    setTitle: (title: string) => void
    setLeftElement: (left: React.ReactNode) => void
    setCenterElement: (center: React.ReactNode) => void
    setRightElement: (right: React.ReactNode) => void
    showLeftButton: () => void
    showCenterElement: () => void
    showRightButton: () => void
    hideLeftButton: () => void
    hideCenterElement: () => void
    hideRightButton: () => void
    resetHeader: () => void
}

const defaultConfig: HeaderConfig = {
    visible: true,
    showLeftButton: true,
    showRightButton: false,
    showCenterElement: true,
    title: ''
}

export const useHeaderStore = create<HeaderStore>((set, get) => ({
    config: defaultConfig,

    updateHeader: (newConfig: Partial<HeaderConfig>) => {
        set(state => ({
            config: { ...state.config, ...newConfig }
        }))
    },

    hideHeader: () => {
        set(state => ({
            config: { ...state.config, visible: false }
        }))
    },

    showHeader: () => {
        set(state => ({
            config: { ...state.config, visible: true }
        }))
    },

    setTitle: (title: string) => {
        set(state => ({
            config: { ...state.config, title }
        }))
    },

    setLeftElement: (left: React.ReactNode) => {
        set(state => ({
            config: { ...state.config, left }
        }))
    },

    setCenterElement: (center: React.ReactNode) => {
        set(state => ({
            config: { ...state.config, center }
        }))
    },

    setRightElement: (right: React.ReactNode) => {
        set(state => ({
            config: { ...state.config, right }
        }))
    },
    showLeftButton: () => {
        set(state => ({
            config: { ...state.config, showLeftButton: true }
        }))
    },
    showCenterElement: () => {
        set(state => ({
            config: { ...state.config, showCenterElement: true }
        }))
    },
    showRightButton: () => {
        set(state => ({
            config: { ...state.config, showRightButton: true }
        }))
    },
    hideLeftButton: () => {
        set(state => ({
            config: { ...state.config, showLeftButton: false }
        }))
    },
    hideCenterElement: () => {
        set(state => ({
            config: { ...state.config, showCenterElement: false }
        }))
    },
    hideRightButton: () => {
        set(state => ({
            config: { ...state.config, showRightButton: false }
        }))
    },

    resetHeader: () => {
        set({ config: defaultConfig })
    }
}))
