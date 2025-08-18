import { TagPerson } from '@/components'

export function OnboardingHeader({
    tags,
    title,
    description,
    isSkipable = false,
    progress = 0,
    subTitle = '',
    voteLimit = ''
}: {
    tags?: string[]
    title: string
    description?: string
    voteLimit?: string
    isSkipable?: boolean
    progress: number
    subTitle?: string
}) {
    return (
        <div className="mt-20 mb-20 -ml-20 flex w-screen flex-col gap-30">
            {/* 프로그레스 바 */}
            <ProgressBar progress={progress} />
            <div className="flex flex-col gap-10 px-20">
                <div className="flex flex-col gap-12">
                    {/* 태그 목록 */}
                    <div className="flex flex-row gap-8">
                        {tags?.map(tag => (
                            <TagPerson
                                key={tag}
                                name={tag}
                            />
                        ))}
                    </div>
                    {/* 서브 타이틀 */}
                    {subTitle && (
                        <span className="text-body2-medium text-primary-500">
                            {subTitle}
                        </span>
                    )}
                    {/* 메인 타이틀 */}
                    <span className="text-title2-semibold text-black">
                        {title}
                    </span>
                </div>
                <div className="flex flex-col gap-12">
                    {/* 투표 제한 수*/}
                    <span className="text-primary-500 text-body2-medium">
                        {voteLimit}
                    </span>
                    {/* 설명 */}
                    {description && (
                        <span className="text-caption-10 max-w-[80%] break-words text-gray-500">
                            {description}
                        </span>
                    )}
                </div>
            </div>
            {/* 건너뛰기 버튼 */}
            {isSkipable && (
                <div className="bg-gray-5 absolute top-50 right-20 rounded-full px-10 py-3">
                    <span className="text-caption-medium text-gray-200">
                        건너뛰기
                    </span>
                </div>
            )}
        </div>
    )
}

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="relative flex flex-row">
            <div className="w-full border-5 border-gray-200"></div>
            <div
                className="border-primary-500 absolute top-0 left-0 rounded-r-full border-5"
                style={{
                    width: `${(100 / progress) * 100}%`
                }}></div>
        </div>
    )
}
