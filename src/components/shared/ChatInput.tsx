import { DeleteCircleIcon, SendIcon } from '@/assets/icons'

export function ChatInput({
    inputRef,
    newMessage,
    setNewMessage,
    handleKeyPress,
    handleSendMessage
}: {
    inputRef: (node: HTMLInputElement | null) => void
    newMessage: string
    setNewMessage: (value: string) => void
    handleKeyPress: (e: React.KeyboardEvent) => void
    handleSendMessage: () => void
}) {
    return (
        <div className="shadow-drop-1 flex w-full items-center justify-between rounded-full bg-white px-16 py-8">
            <input
                ref={inputRef}
                type="text"
                placeholder="메시지를 입력해 주세요."
                className="text-body1-medium text-gray-7 placeholder:text-gray-3 flex-1 bg-transparent focus:outline-none"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            {/* 스크롤된 상태로 채팅창 표시 */}
            <div className="flex items-center gap-10">
                {newMessage && (
                    <button
                        onClick={() => setNewMessage('')}
                        className="flex h-13 w-13 items-center justify-center">
                        <DeleteCircleIcon />
                    </button>
                )}
                <div
                    className="flex h-20 w-20 items-center justify-center"
                    onClick={() => handleSendMessage()}>
                    <SendIcon />
                </div>
            </div>
        </div>
    )
}
