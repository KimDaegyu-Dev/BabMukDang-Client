import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { SocketProvider, useSocket } from '@/contexts/SocketContext'
import {
    ChatButton,
    ChatModal,
    ToastMessage,
    OnboardingButton
} from '@/components'
import { useHeader, useBottomNav } from '@/hooks'

export const OnboardingLayout = () => {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { hideHeader, resetHeader } = useHeader()
    const { hideBottomNav, resetBottomNav } = useBottomNav()
    const navigate = useNavigate()
    const { matchType } = useParams<{
        matchType: 'announcement' | 'invitation'
    }>()

    const [stage, setStage] = useState('waiting')
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const isFirstStageEffect = useRef(true)
    useEffect(() => {
        hideHeader()
        hideBottomNav()
        isFirstStageEffect.current = true
        navigate(`/${matchType}/${stage}/1`, {
            replace: true
        })
        return () => {
            resetHeader()
            resetBottomNav()
        }
    }, [])
    useLayoutEffect(() => {
        navigate(`/${matchType}/${stage}/1`, {
            replace: true
        })
        if (isFirstStageEffect.current) {
            isFirstStageEffect.current = false
            return
        }
        setToastMessage('다음 단계로 이동했어요')
        setToastOpen(true)
    }, [stage])
    return (
        <SocketProvider>
            <Outlet />
            <div className="fixed bottom-38 left-0 z-50 flex h-60 w-full flex-row gap-20 rounded-full px-20">
                {/* Next Button */}
                <OnboardingButton />
            </div>
            <div className="fixed right-20 bottom-38 z-50">
                {/* Chat Button */}
                <ChatButton
                    onClick={() => setIsChatOpen(true)}
                    isOpen={isChatOpen}
                />
            </div>
            {/* Chat Modal */}
            <ChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                roomId="1"
            />
            <ToastMessage
                isOpen={toastOpen}
                message={toastMessage}
                onClose={() => setToastOpen(false)}
            />
            <SocketInner setStage={setStage} />
        </SocketProvider>
    )
}

const SocketInner = ({ setStage }: { setStage: (stage: string) => void }) => {
    const { socket, setInitialState } = useSocket()
    const { matchType } = useParams<{
        matchType: 'announcement' | 'invitation'
    }>()
    useLayoutEffect(() => {
        socket?.on('stage-changed', data => {
            console.log('stage-changed layout', data)
            setStage(data.stage)
        })
        socket?.on('initial-state-response', data => {
            setInitialState(data)
        })
        return () => {
            socket?.off('stage-changed')
        }
    }, [matchType])
    return <></>
}
