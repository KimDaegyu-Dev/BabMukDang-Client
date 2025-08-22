import { useEffect, useState } from 'react'
import { useSocket } from '@/contexts/SocketContext'
import { COLORS } from '@/constants/colors'
import { useNavigate } from 'react-router-dom'

export function OnboardingButton() {
    const {
        socket,
        readyCount,
        participantCount,
        stage,
        isSelfReady,
        setIsSelfReady
    } = useSocket()
    const [countDown, setCountDown] = useState(3)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isSelfReady) {
            setCountDown(3)
            return
        }
        if (readyCount !== participantCount) {
            return
        }
        if (readyCount === participantCount) {
            const interval = setInterval(() => {
                setCountDown(prev => {
                    if (prev === 0) {
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [readyCount, participantCount, isSelfReady])

    const onClickReady = () => {
        setIsSelfReady((prev: boolean) => {
            const next = !prev
            // 새로운 상태 값으로 소켓 이벤트 발생
            socket?.emit('ready-state', { isReady: next })

            if (stage === 'finish') {
                navigate('/')
            }
            return next
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
                {isSelfReady
                    ? `${readyCount}/${participantCount}명 준비 완료 ${readyCount === participantCount ? `(${countDown}초 후 이동)` : ''}`
                    : '선택을 완료할게요'}
            </span>
        </button>
    )
}
