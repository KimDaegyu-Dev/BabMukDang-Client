import { OnboardingHeader } from '@/components'

export function LocationVotePage() {
    return (
        <div className="min-h-screen">
            <OnboardingHeader
                tags={['가은', '최강']}
                title="만날 장소를 정해보아요."
                progress={2}
                voteLimit="1인 1투표"
            />
        </div>
    )
}
