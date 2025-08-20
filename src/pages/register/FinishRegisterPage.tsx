import { CongratsGraphic } from '@/assets/graphics'
import { MutalButton } from '@/components'
import { useNavigate } from 'react-router-dom'

export function FinishRegisterPage() {
    const navigate = useNavigate()
    return (
        <div className="flex h-screen w-full flex-col items-center justify-between pb-40">
            <div></div>
            <div className="flex flex-col items-center gap-28">
                <CongratsGraphic />
                <span className="text-title2-semibold text-gray-8">
                    맛있는 하루되세요!
                </span>
            </div>
            <MutalButton
                text="친구 추가하러 가기"
                onClick={() => {
                    navigate('/')
                }}
                hasArrow={true}
            />
        </div>
    )
}
