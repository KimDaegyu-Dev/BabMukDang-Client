import { useBottomNav, useHeader } from '@/hooks'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function RegisterLayout() {
    const { hideHeader, resetHeader } = useHeader()
    const { hideBottomNav, resetBottomNav } = useBottomNav()
    useEffect(() => {
        hideHeader()
        hideBottomNav()
        return () => {
            resetHeader()
            resetBottomNav()
        }
    }, [])
    return <Outlet />
}
