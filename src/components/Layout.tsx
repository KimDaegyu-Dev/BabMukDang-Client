import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation()

    const navItems = [
        { path: '/', label: '홈', icon: '🏠' },
        { path: '/gps', label: 'GPS', icon: '📍' },
        { path: '/camera', label: '카메라', icon: '📷' },
        { path: '/notifications', label: '알림', icon: '🔔' },
        { path: '/push', label: '푸시', icon: '📤' },
        { path: '/websocket', label: '웹소켓', icon: '🔌' }
    ]

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Main Content */}
            <main className="flex-1 pb-16">{children}</main>

            {/* Bottom Navigation */}
            <nav className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white px-2 py-1">
                <div className="flex justify-around">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center rounded-lg px-3 py-2 transition-colors ${
                                location.pathname === item.path
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}>
                            <span className="mb-1 text-xl">{item.icon}</span>
                            <span className="text-xs font-medium">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    )
}
