import { ArrowIcon } from '@/assets/icons'
import type { IconProps } from './withIconPros'
import { cn } from '@/lib'

export function ArrowForwardIcon(props: IconProps) {
    return <ArrowIcon {...props} />
}

export function ArrowBackIcon(props: IconProps) {
    return (
        <ArrowIcon
            {...props}
            className={cn('rotate-180', props.className)}
        />
    )
}

export function ArrowUpIcon(props: IconProps) {
    return (
        <ArrowIcon
            {...props}
            className={cn('rotate-90', props.className)}
        />
    )
}

export function ArrowDownIcon(props: IconProps) {
    return (
        <ArrowIcon
            {...props}
            className={cn('rotate-270', props.className)}
        />
    )
}
