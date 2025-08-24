import { HeartIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'

export const HeartDefaultIcon = ({ className }: { className?: string }) => {
    return (
        <HeartIcon
            fillcolor={'none'}
            strokecolor={COLORS.gray3}
            className={className}
        />
    )
}
export const HeartFilledIcon = ({ className }: { className?: string }) => {
    return (
        <HeartIcon
            fillcolor={COLORS.primaryMain}
            strokecolor={COLORS.primary400}
            className={className}
        />
    )
}
export const HeartWhiteIcon = ({ className }: { className?: string }) => {
    return (
        <HeartIcon
            fillcolor={'none'}
            strokecolor={COLORS.white}
            className={className}
        />
    )
}
