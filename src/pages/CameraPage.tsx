import { useState } from 'react'

export default function CameraPage() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null)

    const selectFromGallery = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'

        input.onchange = e => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = e => {
                    setCapturedImage(e.target?.result as string)
                }
                reader.readAsDataURL(file)
            }
        }

        input.click()
    }

    const downloadImage = () => {
        if (capturedImage) {
            const link = document.createElement('a')
            link.download = `photo-${Date.now()}.jpg`
            link.href = capturedImage
            link.click()
        }
    }

    const clearImage = () => {
        setCapturedImage(null)
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    카메라 & 갤러리
                </h1>
                <p className="text-gray-600">사진 촬영 및 이미지 처리</p>
            </div>

            {/* 오류 메시지 */}
            {/* {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-red-800">{error}</p>
                </div>
            )} */}

            {/* 카메라 컨트롤 */}
            <div className="mb-6 space-y-3">
                <button
                    onClick={selectFromGallery}
                    className="w-full rounded-lg bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700">
                    📁 갤러리에서 선택
                </button>
            </div>

            {/* 캡처된 이미지 */}
            {capturedImage && (
                <div className="mb-6">
                    <h3 className="mb-3 font-semibold text-gray-900">
                        캡처된 이미지
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="h-64 w-full object-cover"
                        />
                        <div className="space-y-2 p-4">
                            <button
                                onClick={downloadImage}
                                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                                💾 이미지 다운로드
                            </button>
                            <button
                                onClick={clearImage}
                                className="w-full rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700">
                                🗑️ 이미지 삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
