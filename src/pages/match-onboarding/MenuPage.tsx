import { useEffect, useState } from 'react'

import { useSocket } from '@/contexts/SocketContext'
import { MenuCard, OnboardingHeader } from '@/components'
import { useAuthStore } from '@/store'

export interface MenuRecommendationDto {
    code: number
    label: string
}
interface initialState {
    availableMenus: MenuRecommendationDto[]
    menuPerUserSelections: Map<string, string[]>
}
interface MenuRecommendation extends MenuRecommendationDto {
    selectedUsers?: string[]
}

type MenuPickUpdate = {
    menuId: string
    selectedUsers: string[]
}[]
export function MenuPage() {
    const { initialState, categories, socket } = useSocket()
    const { userId } = useAuthStore()
    const [menuRecommendations, setMenuRecommendations] = useState<
        MenuRecommendation[]
    >([])
    useEffect(() => {
        if (initialState && initialState.stage === 'menu') {
            setMenuRecommendations(
                initialState.initialState
                    .availableMenus as MenuRecommendationDto[]
            )
            const menuPerUserSelections =
                initialState.initialState.menuPerUserSelections
            setMenuPerUserSelections(menuPerUserSelections)
        }
    }, [initialState])

    const handleSelectPeople = (index: number) => {
        socket?.emit('pick-menu', { menuId: menuRecommendations[index].label })
    }

    const setMenuPerUserSelections = (data: MenuPickUpdate) => {
        setMenuRecommendations(prev =>
            prev.map(item => {
                const updateItem = data.find(
                    update => update.menuId === item.label
                )
                if (updateItem) {
                    return {
                        ...item,
                        selectedUsers: updateItem.selectedUsers
                    }
                }
                return item
            })
        )
    }

    useEffect(() => {
        socket?.on('menu-pick-updated', (data: MenuPickUpdate) => {
            setMenuPerUserSelections(data)
        })
    }, [socket])
    return (
        <>
            <div className="grid grid-cols-3 gap-10">
                {menuRecommendations.map((menu, index) => (
                    <MenuCard
                        key={index}
                        selectedUsers={menu?.selectedUsers}
                        menuName={menu.label}
                        category={categories.find(
                            item => item.name === menu.label
                        )}
                        onClick={() => handleSelectPeople(index)}
                        currentUser={userId}
                    />
                ))}
            </div>
        </>
    )
}
