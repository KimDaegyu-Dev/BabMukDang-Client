export * from './onboarding'
export * from './matching'
export * from './home'
export * from './register'
export * from './profile'
export * from './meeting'

interface AnnouncementResponse {
    meetingId: string
    meetingAt: string
    location: string
    participantNames: string[]
    participants: [
        {
            userId: string
            userName: string
            userProfileImageURL: string
        }
    ]
    recentMenu: [
        {
            userId: string
            menu: string[]
        }
    ]
}

interface AnnouncementRequestBody {
    location: string
    locationDetail: {
        placeName: string
        placeAddress: string
        lat: number
        lng: number
    }
    restaurant: {
        restaurantId: string
        restaurantName: string
        restaurantAddress: string
        restaurantPhone: string
        restaurantPlaceURL: string
    }
}
interface InvitationRequestBody {
    location: string
    locationDetail: {
        placeName: string
        placeAddress: string
        lat: number
        lng: number
    }
    restaurant: {
        restaurantId: string
        restaurantName: string
        restaurantAddress: string
        restaurantPhone: string
        restaurantPlaceURL: string
    }
    meetingAt: string
}
