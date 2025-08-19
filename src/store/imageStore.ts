import { create } from 'zustand'

interface ImageStore {
    image: File | null
    setImage: (image: File) => void
}
export const useImageStore = create<ImageStore>(set => ({
    image: null,
    setImage: image => set({ image })
}))
