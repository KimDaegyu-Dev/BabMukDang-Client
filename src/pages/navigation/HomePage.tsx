import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {
    EmptyViewIcon,
    KebabIcon,
    ProfileDefaultIcon,
    LocationIcon,
    HeartIcon,
    CommentIcon,
    LogoTextIcon
} from '@/assets/icons'

import { useImageStore } from '@/store'
import { useHeader } from '@/hooks'
import { TagPerson } from '@/components'

export function HomePage() {
    const postList = [1]
    const { setLeftElement, hideCenterElement, resetHeader, showRightButton } =
        useHeader()
    useEffect(() => {
        setLeftElement(<LogoTextIcon />)
        hideCenterElement()
        showRightButton()
        return () => {
            resetHeader()
        }
    }, [])

    return (
        <>
            {postList.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="flex w-136 flex-col items-center justify-center gap-10">
                        <EmptyViewIcon />
                        <span className="text-body1-semibold text-center text-gray-400">
                            오늘은 아직 업로드 된 게시물이 없어요
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-48">
                    <PostCard />
                    <PostCard />
                </div>
            )}
            <UploadButton />
        </>
    )
}

const UploadButton = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const navigate = useNavigate()
    const { setImage } = useImageStore()
    const selectFromGallery = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.multiple = false

        input.onchange = e => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                setImage(file)
                navigate('/upload')
            }
        }

        input.click()
    }
    return (
        <div
            className="border-primary-400 fixed right-20 bottom-110 flex size-60 flex-row items-center justify-center rounded-full border-1 bg-white"
            onClick={selectFromGallery}>
            {/* + 아이콘 */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 0.925781V23.2115"
                    stroke="#FF480A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M0.857147 12H23.1429"
                    stroke="#FF480A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}

const PostCard = () => {
    return (
        <div className="flex w-full flex-col gap-12">
            <PostCardHeader />
            <PostCardContent />
            <PostCardFooter />
        </div>
    )
}
const PostCardHeader = () => {
    return (
        <div className="flex w-full flex-row items-center justify-between px-18">
            {/* 프로필 태그 */}
            <div className="flex flex-row gap-8">
                {/* 프로필 */}
                <div className="flex flex-row items-center gap-10">
                    <ProfileDefaultIcon />
                    <span className="text-body1-semibold">John Doe</span>
                </div>
                {/* 태그 */}
                <div className="flex flex-row items-center gap-8">
                    <TagPerson name="John Doe" />
                </div>
            </div>
            {/* 시간 케밥 */}
            <div className="flex flex-row items-end gap-6">
                {/* 시간 */}
                <span className="text-caption-m text-gray-400">1시간 전</span>
                {/* 케밥 버튼 */}
                <KebabIcon />
            </div>
        </div>
    )
}
const PostCardContent = () => {
    return (
        <div className="relative aspect-square w-full bg-gray-200">
            <img
                // src={require('@/assets/icons/restaurant_pic.png')}
                alt="restaurant"
                className="h-72 w-72 object-cover"
            />
            <div className="absolute bottom-16 left-16 flex flex-row items-center gap-14">
                <div className="flex size-40 items-center justify-center rounded-full bg-white/30">
                    <HeartIcon />
                </div>
                <div className="flex size-40 items-center justify-center rounded-full bg-white/30">
                    <CommentIcon />
                </div>
            </div>
        </div>
    )
}
const PostCardFooter = () => {
    return (
        <div className="shadow-drop-1 rounded-12 flex h-72 w-full flex-row items-center gap-12 bg-white px-18 py-12">
            {/* Left: Restaurant Image */}
            <img
                // src={require('@/assets/icons/restaurant_pic.png')}
                alt="restaurant"
                className="rounded-l-12 h-72 w-72 object-cover"
            />
            {/* Center: Info */}
            <div className="flex w-188 flex-col justify-center gap-6">
                <div className="flex flex-row items-center gap-8">
                    <span className="text-body1-bold">더 맛있는 일식집</span>
                    <span className="text-caption-medium text-gray-3">
                        일식집
                    </span>
                </div>
                <div className="flex w-full flex-row items-center gap-6">
                    {/* Location icon and distance */}
                    <div className="flex flex-row items-end gap-4">
                        <span className="flex items-center">
                            <LocationIcon className="h-16 w-16" />
                        </span>
                        <span className="text-caption-medium text-gray-5">
                            300m
                        </span>
                    </div>
                    <span className="text-caption-medium text-gray-6">
                        서울시 노원구 공릉동 30-2
                    </span>
                </div>
            </div>
        </div>
    )
}
