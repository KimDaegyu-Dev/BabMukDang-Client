import { HeartIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'

export const HeartDefaultIcon = () => {
    return (
        <HeartIcon
            fillcolor={'none'}
            strokecolor={COLORS.gray3}
        />
    )
}
export const HeartFilledIcon = () => {
    return (
        <HeartIcon
            fillcolor={COLORS.primaryMain}
            strokecolor={COLORS.primary400}
        />
    )
}
export const HeartWhiteIcon = () => {
    return (
        <HeartIcon
            fillcolor={'none'}
            strokecolor={COLORS.white}
        />
    )
}
