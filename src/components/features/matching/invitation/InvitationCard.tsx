import React, { useEffect, useRef } from 'react'

export function InvitationCard({
    Graphic,
    bgColor,
    isEditing = false,
    from,
    showEditButton = false,
    editText,
    setEditText,
    setIsEditing
}: {
    Graphic: React.ReactElement
    bgColor: string
    isEditing?: boolean
    from: string
    showEditButton?: boolean
    editText?: string
    setEditText?: (text: string) => void
    setIsEditing?: (isEditing: boolean) => void
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing?.(false)
        }
    }
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])
    return (
        <div
            className={`rounded-16 shadow-drop-1 flex h-fit flex-col items-center justify-between gap-30 px-16 pt-53 pb-16 ${bgColor}`}>
            {/* 초대장 심볼 */}
            <div className="flex h-full w-full flex-col items-center gap-8 px-40">
                {
                    // @ts-ignore: allow adding className to unknown element type at runtime
                    (
                        React.cloneElement as unknown as (
                            element: React.ReactElement<any>,
                            props: any
                        ) => React.ReactElement
                    )(Graphic, {
                        className: 'size-full max-h-[60vh] max-w-[60vw]'
                    })
                }
            </div>
            {/* 초대장 텍스트 */}
            <div className="flex flex-col items-center gap-8">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="text-title1-bold text-white"
                        value={editText}
                        onChange={e => setEditText?.(e.target.value)}
                        onKeyDown={handleEnter}
                        onBlur={() => setIsEditing?.(false)}
                    />
                ) : (
                    <span className="text-title1-bold text-white">
                        {editText}
                    </span>
                )}
                <span className="text-body2-medium text-primary-200">
                    from. {from}
                </span>
            </div>
            {showEditButton && (
                <button
                    className="rounded-5 border-primary-100/60 w-full border-1 px-27 py-5"
                    onClick={() => setIsEditing?.(!isEditing)}>
                    <span className="text-body2-medium text-primary-100">
                        메시지 문구 수정하기
                    </span>
                </button>
            )}
        </div>
    )
}
