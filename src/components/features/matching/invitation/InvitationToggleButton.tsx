import { useState } from 'react'

export function InvitationToggleButton() {
    const [isOn, setIsOn] = useState(false)

    const handleToggle = () => {
        setIsOn(!isOn)
    }

    return (
        <div className="flex w-full items-center justify-between">
            <span className="text-title2-bold text-gray-7">식사 상태</span>
            <div
                className={`rounded-20 flex h-32 w-60 cursor-pointer items-center p-3 transition-all duration-200 ${
                    isOn ? 'bg-primary-500' : 'bg-gray-3'
                }`}
                onClick={handleToggle}>
                <div
                    className={`shadow-drop-1 h-25 w-25 rounded-full bg-white transition-transform duration-200 ${
                        isOn ? 'translate-x-28' : 'translate-x-0'
                    }`}
                />
            </div>
        </div>
    )
}
