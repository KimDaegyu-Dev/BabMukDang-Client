import { Arrow } from '@/assets/icons'

export function ArrowForward() {
    return <Arrow />
}

export function ArrowBack() {
    return <Arrow className="rotate-180" />
}

export function ArrowUp() {
    return <Arrow className="rotate-90" />
}

export function ArrowDown() {
    return <Arrow className="rotate-270" />
}
