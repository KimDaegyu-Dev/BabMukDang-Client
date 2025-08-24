import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import { parseISO } from 'date-fns'

export function CalendarWithMultiple() {
    const [date, setDate] = React.useState<Date[] | undefined>([
        new Date(2025, 5, 12)
    ])
    const serverDateStrings = ['2025-08-27', '2025-09-01', '2025-09-03']
    const serverDates: Date[] = serverDateStrings.map(s => parseISO(s))

    return (
        <Calendar
            mode="multiple"
            selected={date}
            modifiers={{ server: serverDates }}
            onSelect={dates => {
                console.log(dates?.map(date => date.toLocaleDateString()))
                setDate(dates)
            }}
            buttonVariant="ghost"
        />
    )
}
