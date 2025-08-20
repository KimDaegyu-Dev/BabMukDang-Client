import { useEffect, useState } from 'react'

import { LogoTextIcon } from '@/assets/icons'
import { MockPostList } from '@/constants/mockData'
import { useHeader } from '@/hooks'
import { PostCard, PostEmptyView, UploadButton } from '@/components'

export function HomePage() {
    const { setLeftElement, hideCenterElement, resetHeader, showRightButton } =
        useHeader()

    useEffect(() => {
        setLeftElement(<LogoTextIcon fillcolor="black" />)
        hideCenterElement()
        showRightButton()
        return () => {
            resetHeader()
        }
    }, [])
    const [postList, setPostList] = useState(MockPostList)
    return (
        <>
            {postList.length === 0 ? (
                <PostEmptyView />
            ) : (
                <div className="flex flex-col items-center justify-center gap-48">
                    {postList.map((post, index) => (
                        <PostCard
                            key={index}
                            // @ts-ignore: MockPostList may not strictly match Post type; safe for UI mock rendering
                            post={post as any}
                            isComment={false}
                        />
                    ))}
                </div>
            )}
            <UploadButton />
        </>
    )
}
