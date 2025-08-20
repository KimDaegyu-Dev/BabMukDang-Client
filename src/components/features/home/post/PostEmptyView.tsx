import { EmptyViewIcon } from '@/assets/icons'

export function PostEmptyView() {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="flex w-136 flex-col items-center justify-center gap-10">
                <EmptyViewIcon />
                <span className="text-body1-semibold text-center text-gray-400">
                    오늘은 아직 업로드 된 게시물이 없어요
                </span>
            </div>
        </div>
    )
}
