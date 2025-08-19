import { COLORS } from '@/constants/colors'
import { ChallengeIcon } from '@/assets/icons'

export const ChallengeFillIcon = () => {
    return (
        <ChallengeIcon
            className="z-1 flex h-20 w-20 items-center"
            strokecolor={COLORS.primary200}
            bgcolor={COLORS.primary400}
            fillcolor={COLORS.primaryMain}
        />
    )
}

export const ChallengeGrayIcon = () => {
    return (
        <ChallengeIcon
            className="z-1 flex h-20 w-20 items-center"
            strokecolor={COLORS.gray2}
            bgcolor={'none'}
            fillcolor={COLORS.gray3}
        />
    )
}
