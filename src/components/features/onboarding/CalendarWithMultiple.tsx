import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'

export function CalendarWithMultiple() {
    const [date, setDate] = React.useState<Date[] | undefined>([
        new Date(2025, 5, 12)
    ])

    return (
        <Calendar
            mode="multiple"
            selected={date}
            onSelect={dates => {
                console.log(dates?.map(date => date.toLocaleDateString()))
                setDate(dates)
            }}
            className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
            buttonVariant="ghost"
        />
    )
}
