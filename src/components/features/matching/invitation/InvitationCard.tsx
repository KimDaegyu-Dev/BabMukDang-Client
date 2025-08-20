import React from 'react'

export function InvitationCard({
    Graphic,
    bgColor,
    text,
    from,
    showEditButton = false
}: {
    Graphic: React.ReactElement
    bgColor: string
    text: string
    from: string
    showEditButton?: boolean
}) {
    return (
        <div
            className={`rounded-16 drop-shadow-1 flex h-fit flex-col items-center justify-between gap-30 px-16 pt-53 pb-16 ${bgColor}`}>
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
                <span className="text-title1-bold text-white">{text}</span>
                <span className="text-body2-medium text-primary-200">
                    from. {from}
                </span>
            </div>
            {showEditButton && (
                <button className="rounded-5 border-primary-400 w-full border-1 px-27 py-5">
                    <span className="text-body2-medium text-primary-100">
                        메시지 문구 수정하기
                    </span>
                </button>
            )}
        </div>
    )
}
