import { useEffect, useState } from 'react'

import { useSocket } from '@/contexts/SocketContext'
import { TagPerson, OnboardingHeader, ThumbImg } from '@/components'
import { useAuthStore } from '@/store'

type CategoryId = string
interface ExcludeMenuUpdateItem {
    userId: string
    exclusions: CategoryId[]
}
type ExcludeMenuUpdate = ExcludeMenuUpdateItem[]

type InitialState = UserRecentMenus[]
interface UserRecentMenus {
    userId: string
    categoryIds: CategoryId[]
    excludedCategoryIds?: CategoryId[]
}
export function MenuExcludePage() {
    const [userRecentMenus, setUserRecentMenus] = useState<InitialState>([])
    const { initialState, socket } = useSocket()
    useEffect(() => {
        if (initialState && initialState.stage === 'exclude-menu') {
            setUserRecentMenus(initialState.initialState)
            console.log('categories', initialState.initialState)
        }
    }, [initialState])

    useEffect(() => {
        socket?.on('menu-exclusion-updated', (data: ExcludeMenuUpdate) => {
            setUserRecentMenus(prev =>
                prev.map(item => {
                    const updateItem = data.find(
                        update => update.userId === item.userId
                    )
                    console.log('updateItem', updateItem)
                    if (updateItem) {
                        return {
                            ...item,
                            excludedCategoryIds: updateItem.exclusions
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
                title="최근에 먹은 메뉴예요.
                또 먹어도 괜찮아요?"
                progress={1}
                voteLimit="중복 투표"
            />
            <div className="flex flex-col gap-30">
                {userRecentMenus.map((user: UserRecentMenus, index) => (
                    <MenuExcludeList
                        key={index}
                        menuList={user.categoryIds}
                        userId={user.userId}
                        excludedCategoryIds={user.excludedCategoryIds}
                    />
                ))}
            </div>
        </div>
    )
}

// 유저 한명의 메뉴 목록
const MenuExcludeList = ({
    menuList,
    userId,
    excludedCategoryIds
}: {
    menuList: CategoryId[]
    userId: string
    excludedCategoryIds?: CategoryId[]
}) => {
    const { categories, socket } = useSocket()
    const { userId: currentUserId } = useAuthStore()
    const handleClick = (categoryId: CategoryId) => {
        if (userId === currentUserId) {
            socket?.emit('exclude-menu', { categoryId })
        }
    }
    return (
        <div className="flex flex-col gap-10">
            <TagPerson
                name={userId}
                className="w-fit px-18"
            />
            <div className="-ml-20 flex h-120 w-screen gap-10 overflow-x-auto pl-20">
                {menuList.map((categoryId, index) => (
                    <div
                        key={index}
                        className="h-full flex-shrink-0">
                        <ThumbImg
                            item={categories.find(
                                category => category.id === categoryId
                            )}
                            size={120}
                            onClick={() => handleClick(categoryId)}
                            isExcluded={excludedCategoryIds?.includes(
                                categoryId
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
