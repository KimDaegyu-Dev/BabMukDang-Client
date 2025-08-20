import { useHeader } from '@/hooks'
import { useEffect } from 'react'

export function BobCheckHistoryPage() {
    const { setTitle, resetHeader } = useHeader()

    useEffect(() => {
        setTitle('지난 밥 인증 내역')
        return () => {
            resetHeader()
        }
    }, [])
    return (
        <div className="grid grid-cols-3 justify-items-center gap-12 pt-20">
            {[...Array(100)].map((_, index) => (
                <BobCheckHistoryItem key={index} />
            ))}
        </div>
    )
}

function BobCheckHistoryItem() {
    return (
        <div className="rounded-12 bg-gary-3 relative h-110 w-110 overflow-hidden">
            <img
                className="rounded-12 h-full w-full"
                src={'/images/bob_check_history_item.png'}></img>
            {/* badge_date */}
            <div className="bg-gray-1 absolute top-10 left-10 flex items-center justify-center rounded-full px-8 py-3">
                <span className="text-caption-10 text-gary-7">{'8/14'}</span>
            </div>
        </div>
    )
}
