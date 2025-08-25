import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'

type Props = {
    serverDateSelections?: { userId: string; dates: string[] }[]
    onSelectDates?: (dates: string[]) => void
}

export function CalendarWithMultiple({
    serverDateSelections,
    onSelectDates
}: Props) {
    const [selectedDates, setSelectedDates] = React.useState<
        Date[] | undefined
    >([])

    // Build server-marked dates (union of all users' dates)
    const serverDateSet = React.useMemo(() => {
        const set = new Set<string>()
        serverDateSelections?.forEach(({ dates }) => {
            dates.forEach(d => set.add(d))
        })
        return set
    }, [serverDateSelections])

    const serverDates = React.useMemo(() => {
        // incoming format example: '25. 08. 02' -> 2025-08-02
        const toDate = (s: string) => {
            const m = s.match(/^(\d{2})\.\s*(\d{2})\.\s*(\d{2})$/)
            if (m) {
                const [_, yy, mm, dd] = m
                const year = 2000 + parseInt(yy, 10)
                const month = parseInt(mm, 10) - 1
                const day = parseInt(dd, 10)
                return new Date(year, month, day)
            }
            // fallback: try Date parse
            const d = new Date(s)
            return isNaN(d.getTime()) ? undefined : d
        }
        return Array.from(serverDateSet)
            .map(toDate)
            .filter((d): d is Date => !!d)
    }, [serverDateSet])

    return (
        <Calendar
            mode="multiple"
            selected={selectedDates}
            modifiers={{ server: serverDates }}
            onSelect={dates => {
                setSelectedDates(dates)
                const formatted = (dates || []).map(d => {
                    const yy = String(d.getFullYear() % 100).padStart(2, '0')
                    const mm = String(d.getMonth() + 1).padStart(2, '0')
                    const dd = String(d.getDate()).padStart(2, '0')
                    return `${yy}. ${mm}. ${dd}`
                })
                onSelectDates?.(formatted)
            }}
            buttonVariant="ghost"
        />
    )
}
