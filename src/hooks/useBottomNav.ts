import { useBottomNavStore } from '@/store/bottomNavStore'

export const useBottomNav = () => {
    const {
        config,
        updateBottomNav,
        hideBottomNav,
        showBottomNav,
        setItems,
        resetBottomNav
    } = useBottomNavStore()

    return {
        config,
        updateBottomNav,
        hideBottomNav,
        showBottomNav,
        setItems,
        resetBottomNav
    }
}
