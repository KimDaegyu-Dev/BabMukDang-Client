import { LocationIcon } from '@/assets/icons'
import { COLORS } from '@/constants/colors'

export const LocationWhiteIcon = ({ className }: { className?: string }) => {
    return (
        <LocationIcon
            strokecolor={COLORS.white}
            className={className}
        />
    )
}
export const LocationGrayIcon = ({ className }: { className?: string }) => {
    return (
        <LocationIcon
            strokecolor={COLORS.gray4}
            className={className}
        />
    )
}
