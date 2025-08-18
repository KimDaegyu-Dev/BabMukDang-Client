import { useHeaderStore } from '@/store/headerStore'

export const useHeader = () => {
    const {
        config,
        updateHeader,
        hideHeader,
        showHeader,
        setTitle,
        setLeftElement,
        setCenterElement,
        setRightElement,
        showLeftButton,
        showCenterElement,
        showRightButton,
        hideLeftButton,
        hideCenterElement,
        hideRightButton,
        resetHeader
    } = useHeaderStore()

    return {
        config,
        updateHeader,
        hideHeader,
        showHeader,
        setTitle,
        setLeftElement,
        setCenterElement,
        setRightElement,
        showLeftButton,
        showCenterElement,
        showRightButton,
        hideLeftButton,
        hideCenterElement,
        hideRightButton,
        resetHeader
    }
}
