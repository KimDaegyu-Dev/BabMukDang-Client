import { useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, BottomNavigation } from '@/components'
import { useBottomNavStore } from '@/store'

export function Layout() {
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
