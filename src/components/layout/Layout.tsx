import { ReactNode, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { HomeIcon, MatchingIcon, DishIcon, MeetingIcon } from '@/assets/icons'

import { Header, BottomNavigation } from '@/components'
import { useBottomNavStore } from '@/store'

export function Layout() {
    const setItems = useBottomNavStore(state => state.setItems)

    const navItems = [
        { path: '/', label: '홈', icon: HomeIcon },
        {
            path: '/matching',
            label: '매칭',
            icon: MatchingIcon
        },
        { path: '/meeting', label: '밥약', icon: MeetingIcon },
        { path: '/profile', label: '내 밥그릇', icon: DishIcon }
    ]

    // 컴포넌트 마운트 시 기본 네비게이션 아이템 설정
    useEffect(() => {
        setItems(navItems)
    }, [setItems])

    return (
        <div className="bg-gray-1 flex h-screen min-h-screen w-screen min-w-screen flex-col">
            {/* Header */}
            <Header />
            {/* Main Content */}
            <main className="relative flex-1 overflow-x-hidden overflow-y-auto px-20 pb-90">
                <Outlet />
            </main>
            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    )
}
