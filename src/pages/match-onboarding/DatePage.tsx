import { OnboardingHeader, CalendarWithMultiple } from '@/components'

export function DatePage() {
    return (
        <div className="flex min-h-screen flex-col gap-60">
            <OnboardingHeader
                tags={['가은', '최강']}
                title="만날 날짜를 정해보아요."
                description="함께 시간을 보낼 수 있는 날짜를 모두 골라주세요!"
                progress={1}
                voteLimit="중복 투표"
            />
            <CalendarWithMultiple />
        </div>
    )
}
