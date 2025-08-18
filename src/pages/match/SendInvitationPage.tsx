export function SendInvitationPage() {
    return (
        <div className="flex h-full w-full flex-col gap-20">
            {/* 카드 리스트 */}
            <div className="flex flex-row items-center justify-between gap-10">
                <span>초대장</span>
            </div>
            {/* 초대장 카드 */}
            <div className="rounded-16 flex h-403 flex-col items-center justify-end gap-30 p-16">
                {/* 초대장 심볼 */}
                <div className="flex flex-col items-center gap-8">
                    {/* todo: 초대장 심볼 추가 */}
                </div>
                {/* 초대장 텍스트 */}
                <div className="flex flex-col items-center gap-8">
                    <span className="text-tile1-bold text-white">초대장</span>
                    <span className="text-body2-medium text-primary-200">
                        초대장
                    </span>
                </div>
                <button className="rounded-5 border-primary-400 w-full border-1 px-27 py-5">
                    <span className="text-body2-medium text-primary-100">
                        메시지 문구 수정하기
                    </span>
                </button>
            </div>
            {/* 보내기 버튼 */}
        </div>
    )
}
