import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useImageStore } from '@/store'
import { useBottomNav, useHeader } from '@/hooks'
import { TagPerson, MutalButton } from '@/components'

export function UploadPage() {
    const { image: imageFile } = useImageStore()
    const [image, setImage] = useState<string | null>(null)
    const { showBottomNav, hideBottomNav } = useBottomNav()
    const { setTitle, resetHeader } = useHeader()
    useEffect(() => {
        if (!imageFile) return
        const reader = new FileReader()
        reader.onload = e => {
            setImage(e.target?.result as string)
        }
        reader.readAsDataURL(imageFile)
    }, [imageFile])

    useLayoutEffect(() => {
        hideBottomNav()
        setTitle('사진 업로드')
        return () => {
            showBottomNav()
            resetHeader()
        }
    }, [])
    return (
        <div className="absolute top-0 left-0 flex h-full w-screen flex-col items-center justify-center pb-110">
            {image && (
                <>
                    <img
                        className="aspect-square w-full overflow-hidden object-cover"
                        src={image}
                        alt="uploaded image"
                    />
                </>
            )}
            <TagPerson name="태그+" />
            <div className="fixed bottom-10 w-full px-20">
                <UploadButton disabled={false} />
            </div>
        </div>
    )
}

function UploadButton({ disabled }: { disabled?: boolean }) {
    const handleJoin = () => {
        if (disabled) return
    }

    return (
        <Link
            replace
            to="/search-restaurant">
            <MutalButton
                text="업로드"
                onClick={handleJoin}
                hasArrow={true}
            />
        </Link>
    )
}
