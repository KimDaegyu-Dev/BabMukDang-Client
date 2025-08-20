import { useEffect, useState } from 'react'

import { useSocket } from '@/contexts/SocketContext'
import { TagPerson, OnboardingHeader, ThumbImg } from '@/components'

interface UserCategory {
    userId: string
    availableCategoryIds: string[]
}
export function MenuExcludePage() {
    const [userCategories, setUserCategories] = useState<UserCategory[]>([])
    const { initialState } = useSocket()
    useEffect(() => {
        if (initialState && initialState.stage === 'exclude-menu') {
            setUserCategories(initialState.initialState)
            console.log('categories', initialState.initialState)
        }
    }, [initialState])
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                title="최근에 먹은 메뉴예요.
                또 먹어도 괜찮아요?"
                progress={1}
                voteLimit="중복 투표"
            />
            <div className="flex flex-col gap-30">
                {userCategories.map((userCategory, index) => (
                    <MenuExcludeList
                        key={index}
                        menuList={userCategory.availableCategoryIds}
                        userId={userCategory.userId}
                    />
                ))}
            </div>
        </div>
    )
}
const MenuExcludeList = ({
    menuList,
    userId
}: {
    menuList: string[]
    userId: string
}) => {
    const { categories } = useSocket()
    const handleClick = (categoryId: string) => {
        console.log(categoryId)
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
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
