import { useEffect, useState } from 'react'

import { MenuIcon } from '@/assets/icons'

import { useSocket } from '@/contexts/SocketContext'
import { OnboardingHeader, ThumbImg } from '@/components'

interface Menu {
    menuCategoryId: string
    menuName: string
    selectPeople?: string[]
    menuImage?: string
}
export function MenuPage() {
    const { initialState, categories } = useSocket()
    const [menu, setMenu] = useState<Menu[]>([])
    useEffect(() => {
        if (initialState && initialState.stage === 'menu') {
            setMenu(initialState.initialState)
        }
    }, [initialState])
    const handleSelectPeople = (index: number) => {
        setMenu(prev => {
            const newMenu = [...prev]
            newMenu[index].selectPeople = [
                ...(newMenu[index].selectPeople || []),
                '가은'
            ]
            return newMenu
        })
    }
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                tags={['가은', '최강']}
                title="오늘의 메뉴를 골라보아요."
                progress={3}
                voteLimit="중복 투표"
            />
            <div className="grid grid-cols-3 gap-10">
                {categories.map((category, index) => (
                    <MenuCard
                        key={index}
                        selectPeople={menu[index].selectPeople}
                        menuName={category.name}
                        menuCategoryId={category.id}
                        category={category}
                        onClick={() => handleSelectPeople(index)}
                    />
                ))}
            </div>
        </div>
    )
}

const MenuCard = ({
    selectPeople,
    menuName,
    category,
    menuCategoryId,
    onClick
}: {
    selectPeople?: string[]
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
                className={`bg-gray-2 rounded-12 relative w-full overflow-hidden ${selectPeople && selectPeople.length > 0 ? 'border-primary-main border-2' : ''}`}>
                <div className="-gap-4 absolute top-8 left-8 flex h-full w-full flex-row flex-wrap">
                    {/* 사람 프로필 */}
                    {selectPeople?.map((person, index) => (
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
