export const mealTimeMap = {
    아침: '09:00:00',
    아점: '11:00:00',
    점심: '12:00:00',
    점저: '16:00:00',
    저녁: '18:00:00',
    야식: '20:00:00'
}

export const mealTimeTextArr = ['아침', '아점', '점심', '점저', '저녁', '야식']
export type MealTime = keyof typeof mealTimeMap
export type MealTimeText = (typeof mealTimeMap)[MealTime]

export const mealTimeMapReverse: Record<MealTimeText, MealTime> =
    Object.fromEntries(
        Object.entries(mealTimeMap).map(([key, value]) => [
            value,
            key as MealTime
        ])
    )
