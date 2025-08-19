import { useEffect, useState } from 'react'
import { useSocket } from '@/contexts/SocketContext'
import { COLORS } from '@/constants/colors'

export function OnboardingButton() {
    const { socket } = useSocket()
    const [isReady, setIsReady] = useState(false)
    const [readyCount, setReadyCount] = useState(0)
    const [participantCount, setParticipantCount] = useState(0)
    useEffect(() => {
        socket?.on('ready-state-changed', (data: any) => {
            setReadyCount(data.readyCount)
            setParticipantCount(data.participantCount)
        })
        socket?.on('stage-changed', data => {
            setIsReady(false)
        })
    }, [])
    const onClickReady = () => {
        setIsReady(prev => {
            const newIsReady = !prev
            // 새로운 상태 값으로 소켓 이벤트 발생
            socket?.emit('ready-state', { isReady: newIsReady })
            return newIsReady
        })
    }
    return (
        <button
            onClick={onClickReady}
            className="relative h-full w-full overflow-hidden rounded-full border-0 p-0"
            style={{ backgroundColor: COLORS.gray2 }}>
            <span
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                style={{
                    width:
                        participantCount > 0
                            ? `${(readyCount / participantCount) * 100}%`
                            : '0%',
                    backgroundColor:
                        readyCount === participantCount
                            ? COLORS.primary500
                            : COLORS.primary300, // darker blue for filled part
                    zIndex: 1
                }}
            />
            <span className="relative z-10 flex w-full items-center justify-center">
                {isReady
                    ? `${readyCount}/${participantCount}명 준비 완료`
                    : '선택을 완료할게요'}
            </span>
        </button>
    )
}
