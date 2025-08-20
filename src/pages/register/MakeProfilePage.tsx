import { useEffect, useRef, useState } from 'react'
import { AlbumIcon } from '@/assets/icons'
import { NextButton } from '@/components'
import { useNavigate } from 'react-router-dom'

export function MakeProfilePage() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    return (
        <div className="flex h-full w-full flex-col justify-between">
            {/* Title */}
            <div className="pt-24">
                <span className="text-title2-semibold text-black">
                    프로필을 만들어주세요!
                </span>
            </div>

            {/* Avatar + album overlay */}
            <div className="flex w-full flex-col items-center justify-center gap-54">
                <div className="relative">
                    <div
                        className="shadow-drop-1 bg-gray-3 size-176 overflow-hidden rounded-full bg-cover bg-center"
                        style={{
                            backgroundImage: previewUrl
                                ? `url(${previewUrl})`
                                : undefined
                        }}
                    />
                    {/* 프로필 이미지 업로드 버튼 */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="앨범에서 사진 선택"
                        className="bg-gray-2 absolute right-0 bottom-0 flex size-41 items-center justify-center rounded-full">
                        <AlbumIcon />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={onSelectImage}
                        className="hidden"
                    />
                </div>
                {/* 이름 입력 */}
                <div className="mx-auto flex w-219 flex-col gap-6">
                    <div className="flex justify-between">
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value.slice(0, 6))}
                            placeholder="이름을 입력해주세요."
                            className="text-body2-medium text-gray-6 w-full bg-transparent focus:outline-none"
                        />
                        <span className="text-body2-medium text-gray-4 text-nowrap">
                            ({name.length}/6자)
                        </span>
                    </div>
                    <div className="border-gray-7 h-0 w-full border-b" />
                </div>
            </div>
            <div></div>
            {/* 다음 버튼 */}
            <NextButton
                onClick={() => {
                    navigate('/prefer-menu')
                }}
            />
        </div>
    )
}
