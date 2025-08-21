import { useEffect, useState } from 'react'

import { MenuIcon } from '@/assets/icons'

import { useSocket } from '@/contexts/SocketContext'
import { OnboardingHeader, ThumbImg } from '@/components'

export interface MenuRecommendation {
    code: string
    label: string
    group_score: number
    member_scores: Record<string, number>
    reasons: string[]
    selectedUsers?: string[]
}

type MenuPickUpdate = {
    menuId: string
    selectedUsers: string[]
}[]
export function MenuPage() {
    const { initialState, categories, socket } = useSocket()
    const [menuRecommendations, setMenuRecommendations] = useState<
        MenuRecommendation[]
    >([])
    useEffect(() => {
        if (initialState && initialState.stage === 'menu') {
            setMenuRecommendations(initialState.initialState)
        }
    }, [initialState])
    const handleSelectPeople = (index: number) => {
        socket?.emit('pick-menu', { menuId: categories[index].id })
    }

    useEffect(() => {
        socket?.on('menu-pick-updated', (data: MenuPickUpdate) => {
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
        })
    }, [socket])
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                title="오늘의 메뉴를 골라보아요."
                progress={3}
                voteLimit="중복 투표"
            />
            <div className="grid grid-cols-3 gap-10">
                {menuRecommendations.map((menu, index) => (
                    <MenuCard
                        key={index}
                        selectedUsers={menu?.selectedUsers}
                        menuName={menu.label}
                        menuCategoryId={menu.code}
                        category={categories.find(
                            item => item.name === menu.label
                        )}
                        onClick={() => handleSelectPeople(index)}
                    />
                ))}
            </div>
        </div>
    )
}

const MenuCard = ({
    selectedUsers,
    menuName,
    category,
    menuCategoryId,
    onClick
}: {
    selectedUsers?: string[]
    menuName: string
    menuCategoryId: string
    category: any
    onClick: () => void
}) => {
    return (
        <div
            className="flex flex-col items-center justify-center gap-2"
            onClick={onClick}>
            {/* 이미지 */}
            <div
                className={`bg-gray-2 rounded-12 relative w-full overflow-hidden ${selectedUsers && selectedUsers.length > 0 ? 'border-primary-main border-2' : ''}`}>
                <div className="-gap-4 absolute top-8 left-8 z-100 flex h-full w-full flex-row flex-wrap">
                    {/* 사람 프로필 */}
                    {selectedUsers?.map((person, index) => (
                        <div
                            key={index}
                            className="bg-gray-2 h-20 w-20 overflow-hidden rounded-full">
                            <img
                                src="https://picsum.photos/200/300"
                                alt="menu"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <ThumbImg
                    item={category}
                    size={'full'}
                    className="rounded-12"
                    aspectRatio={'6/7'}
                    onClick={() => {}}
                />
            </div>
            {/* 이름 */}
            <div className="text-body2-medium text-gray-7">{menuName}</div>
        </div>
    )
}
