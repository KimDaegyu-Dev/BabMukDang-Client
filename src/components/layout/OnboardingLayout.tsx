import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import { SocketProvider, useSocket } from '@/contexts/SocketContext'
import {
    ChatButton,
    ChatModal,
    ToastMessage,
    OnboardingButton,
    ProgressBar,
    OnboardingHeader
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
            <ContentBlocker />
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
            <ToastMessage />
            <SocketInner setStage={setStage} />
        </SocketProvider>
    )
}
const ContentBlocker = () => {
    const { isSelfReady } = useSocket()
    const { pathname } = useLocation()
    const isWaiting = pathname.split('/')[2] === 'waiting'
    const isFinish = pathname.split('/')[2] === 'finish'
    return (
        <div className={isSelfReady ? 'pointer-events-none' : ''}>
            {!(isWaiting || isFinish) && (
                <OnboardingHeader isSkipable={false} />
            )}
            <Outlet />
        </div>
    )
}
const SocketInner = ({ setStage }: { setStage: (stage: string) => void }) => {
    const { socket, setInitialState, setParticipants, setFinalState } =
        useSocket()
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
        socket?.on('join-room', data => {
            setParticipants(data)
        })
        socket?.on('final-state-response', data => {
            console.log('final-state-response', data)
            setFinalState(data)
        })
        return () => {
            socket?.off('stage-changed')
            socket?.off('initial-state-response')
            socket?.off('join-room')
            socket?.off('final-state-response')
        }
    }, [matchType, socket])
    return <></>
}
