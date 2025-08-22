export const FriendProfileList = ({
    selectedUsers
}: {
    selectedUsers: string[]
}) => {
    return (
        <>
            {selectedUsers?.map((userId, index) => (
                <div
                    key={index}
                    className="bg-gray-2 h-20 w-20 overflow-hidden rounded-full">
                    <img
                        src="https://picsum.photos/200/300"
                        alt="menu"
                        className="h-full w-full object-cover"
                    />
                </div>
            ))}
        </>
    )
}
