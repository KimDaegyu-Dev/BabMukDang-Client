import { useNavigate } from 'react-router-dom'
import { useImageStore } from '@/store'
import { useState } from 'react'

export function UploadButton() {
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
            className="border-primary-400 fixed right-20 bottom-110 z-51 flex size-60 flex-row items-center justify-center rounded-full border-1 bg-white"
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
