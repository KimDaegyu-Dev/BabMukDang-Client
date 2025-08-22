import { useState } from 'react'
import { HungryIcon, NotHungryIcon } from '@/assets/icons'

export function InvitationToggleButton() {
    const [isOn, setIsOn] = useState(false)

    const handleToggle = () => {
        setIsOn(!isOn)
    }

    return (
        <div className="flex w-full items-center justify-between">
            <span className="text-title2-bold text-gray-7">식사 상태</span>
            {/* <div
                className={`flex flex-row items-center gap-12 ${
                    isOn ? 'text-gray-7' : 'text-primary-500'
                }`}
                onClick={handleToggle}>
                {isOn ? <NotHungryIcon /> : <HungryIcon />}
                <span className="text-body2-medium">
                    {isOn ? '배불러요' : '배고파요'}
                </span>
            </div> */}
            <div
                className={`rounded-20 flex h-32 w-60 cursor-pointer items-center p-3 transition-all duration-200 ${
                    isOn ? 'bg-primary-500' : 'bg-gray-3'
                }`}
                onClick={handleToggle}>
                <div
                    className={`shadow-drop-1 h-25 w-25 rounded-full bg-white transition-transform duration-200 ${
                        isOn ? 'translate-x-28' : 'translate-x-0'
                    }`}>
                    <div className="size-25">
                        {isOn ? (
                            <HungryIcon className="size-25" />
                        ) : (
                            <NotHungryIcon className="size-25" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
