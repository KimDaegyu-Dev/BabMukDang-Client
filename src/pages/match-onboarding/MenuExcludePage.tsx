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
            console.log(initialState)
            setUserCategories(initialState.initialState)
        }
    }, [initialState])
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                subTitle="AI가 정보를 불러왔어요!"
                title="최근에 먹은 메뉴예요.
                또 먹어도 괜찮아요?"
                progress={1}
                voteLimit="중복 투표"
            />
            <div className="flex flex-col gap-30">
                {userCategories.map(userCategory => (
                    <MenuExcludeList
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
            <TagPerson name={userId} />
            <div className="flex gap-10 overflow-x-auto">
                {categories.map(
                    category =>
                        menuList.some(menu => menu === category.name) && (
                            <div
                                key={category.id}
                                className="flex-shrink-0">
                                <ThumbImg
                                    item={category}
                                    size={120}
                                    className="rounded-12"
                                    onClick={() => handleClick(category.id)}
                                />
                            </div>
                        )
                )}
            </div>
        </div>
    )
}
