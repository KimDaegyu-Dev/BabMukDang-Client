import { Link, useLocation } from 'react-router-dom'
import { useBottomNavStore } from '@/store/bottomNavStore'
import { BOTTOM_NAVIGATION_HEIGHT } from '@/constants/bottomNav'

interface BottomNavigationProps {
    items?: Array<{
        path: string
        label: string
        icon: React.ElementType
    }>
}
export function BottomNavigation({ items }: BottomNavigationProps) {
    const location = useLocation()
    const bottomNavConfig = useBottomNavStore(state => state.config)

    // items prop이 제공되면 우선 사용, 아니면 Zustand 스토어의 items 사용
    const finalItems = items || bottomNavConfig.items || []

    if (!bottomNavConfig.visible) {
        return null
    }

    const bgcolor = (path: string) =>
        location.pathname === path ? '#FFE2D9' : 'white'
    const strokecolor = (path: string) =>
        location.pathname === path ? '#FF480B' : '#B7B7B7'
    const textColor = (path: string) =>
        location.pathname === path ? 'text-primary-main' : 'text-gray-600'

    return (
        <nav
            className={`fixed right-0 bottom-0 left-0 z-500 border-t border-gray-200 bg-white px-36 pt-10`}
            style={{ height: `${BOTTOM_NAVIGATION_HEIGHT}px` }}>
            <div className="flex justify-between">
                {finalItems.map((item, index) => (
                    <Link
                        replace
                        key={index}
                        to={item.path}
                        className={`flex min-w-45 flex-col items-center gap-4 rounded-lg`}>
                        <item.icon
                            className="size-24 min-h-24 min-w-24"
                            strokecolor={strokecolor(item.path)}
                            bgcolor={bgcolor(item.path)}
                        />
                        <span
                            className={`text-caption-medium ${textColor(
                                item.path
                            )}`}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}
