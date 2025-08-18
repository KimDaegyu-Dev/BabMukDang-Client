import { DeleteCircleIcon, SearchIcon } from '@/assets/icons'
import { useState } from 'react'

export function SearchLocationInput({
    handleSearch
}: {
    handleSearch: (searchKeyword: string) => void
}) {
    const [searchKeyword, setSearchKeyword] = useState<string>('')
    // 검색어 초기화 함수
    const clearSearch = () => {
        setSearchKeyword('')
    }

    // Enter 키로 메시지 전송
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSearch(searchKeyword)
        }
    }
    return (
        <div className="shadow-drop-1 absolute top-17 z-10 flex w-full items-center justify-between rounded-full bg-white px-16 py-8">
            <input
                type="text"
                placeholder="음식점 이름을 검색해 주세요."
                className="text-body1-medium text-gray-7 placeholder:text-gray-3 flex-1 bg-transparent focus:outline-none"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <div className="flex items-center gap-10">
                {searchKeyword && (
                    <button
                        onClick={clearSearch}
                        className="flex h-13 w-13 items-center justify-center">
                        <DeleteCircleIcon />
                    </button>
                )}
                <div
                    className="flex h-20 w-20 items-center justify-center"
                    onClick={() => handleSearch(searchKeyword)}>
                    <SearchIcon />
                </div>
            </div>
        </div>
    )
}
