// Types for matching announcements
import { MatchingAnnouncement } from '@/types'
export const MockAnnouncements: MatchingAnnouncement[] = [
    {
        id: 1,
        title: '7시 학교 앞에서\n밥 먹을 사람!',
        time: '8월 7일 오후 7시',
        location: '서울과학기술대학교 정문 앞',
        participants: [{ name: '김대규' }, { name: '김성휘' }],
        maxParticipants: 3,
        timeLeft: '30분 후 종료',
        creator: { name: '유가은' }
    },
    {
        id: 2,
        title: '같이 커피 마실 사람\n구해요!',
        time: '8월 8일 오후 3시',
        location: '홍대입구역 2번 출구',
        participants: [{ name: '이민수' }],
        maxParticipants: 4,
        timeLeft: '1시간 후 종료',
        creator: { name: '박소영' }
    },
    {
        id: 3,
        title: '밥 먹을 사람 구해요!',
        time: '8월 8일 오후 8시',
        location: '강남 CGV',
        participants: [
            { name: '최지훈' },
            { name: '김하늘' },
            { name: '정우진' }
        ],
        maxParticipants: 4,
        timeLeft: '2시간 후 종료',
        creator: { name: '이서연' }
    },
    {
        id: 4,
        title: '배달 시켜먹을 사람 구해요!',
        time: '8월 9일 오후 6시',
        location: '국립중앙도서관',
        participants: [{ name: '강민지' }],
        maxParticipants: 5,
        timeLeft: '3시간 후 종료',
        creator: { name: '윤성호' }
    },
    {
        id: 5,
        title: '고독한 미식가 구해요!',
        time: '8월 10일 오전 7시',
        location: '북한산 입구',
        participants: [{ name: '조현우' }, { name: '김태영' }],
        maxParticipants: 6,
        timeLeft: '5시간 후 종료',
        creator: { name: '이동현' }
    },
    {
        id: 6,
        title: '밥 먹을 사람 구해요!',
        time: '8월 8일 오후 7시',
        location: '홍대',
        participants: [{ name: '박준혁' }],
        maxParticipants: 4,
        timeLeft: '4시간 후 종료',
        creator: { name: '최은아' }
    }
]

export const MockCouponList = [
    {
        isUsed: true,
        restaurantName: '동학 주점',
        discount: 2000,
        couponImageUrl: '/test/coupon-restaurant.png',
        expirationDate: '2025년 9월 16일까지',
        couponType: '서비스'
    },
    {
        isUsed: true,
        restaurantName: '동학 주점',
        discount: 2000,
        couponImageUrl: '/test/coupon-restaurant.png',
        expirationDate: '2025년 9월 16일까지',
        couponType: '할인'
    },
    {
        isUsed: false,
        restaurantName: '동학 주점',
        discount: 2000,
        couponImageUrl: '/test/coupon-restaurant.png',
        expirationDate: '2025년 9월 16일까지',
        couponType: '서비스'
    },
    {
        isUsed: false,
        restaurantName: '동학 주점',
        discount: 2000,
        couponImageUrl: '/test/coupon-restaurant.png',
        expirationDate: '2025년 9월 16일까지',
        couponType: '서비스'
    }
]
export const MockMatchingInviteNotis = [
    {
        id: 1,
        type: 'invitation',
        title: '매칭하기 초대장',
        time: '20분 전',
        message: '가은님이 초대장을 보냈어요! 지금 확인해보고, 답장해봐요!',
        period: '',
        imageUrl: '' // TODO: add image if needed
    },
    {
        id: 2,
        type: 'announcement',
        title: '공고 알림',
        time: '20분 전',
        message: '가은님이 초대장을 보냈어요! 지금 확인해보고, 답장해봐요!',
        period: '',
        imageUrl: '' // TODO: add image if needed
    }
]
export const MockLocalNewsNotis = [
    {
        id: 2,
        type: 'school',
        title: '여기 꼬치네 공릉역점',
        time: '20분 전',
        message: '여름 방학 맞이 사장님이 아이스크림 쏜다!',
        period: '~2025.8.31까지 · 진행중',
        imageUrl: '' // TODO: add image if needed
    },
    {
        id: 3,
        type: 'restaurant',
        title: '여기 꼬치네 공릉역점',
        time: '20분 전',
        message: '여름 방학 맞이 사장님이 아이스크림 쏜다!',
        period: '~2025.6.31까지 · 종료',
        imageUrl: ''
    }
]

type MyProfileData = {
    profileImgUrl: string
    name: string
    description: string
    preferredMenus: string[]
    cantEat: string[]
}
export const MockMyProfileData = {
    profileImgUrl: '/src/assets/icons/icon_profile_default.svg',
    name: '서은우',
    description: '기억이 아닌 추억으로',
    preferredMenus: ['한식', '일식', '양식', '분식'],
    cantEat: ['향신료', '락토', '락토 오보', '락토 오보 오보'],
    friends: 100,
    completedMeetings: 100,
    uncompletedMeetings: 100,
    challengeCount: 6
}
type FriendProfileData = {
    profileImgUrl: string
    name: string
    description: string
    preferredMenus: string[]
    cantEat: string[]
}

export const MockFriendProfileData = {
    profileImgUrl: '/src/assets/icons/icon_profile_default.svg',
    name: '유가은',
    description: '반갑습니다',
    preferredMenus: ['한식', '일식', '양식', '분식'],
    cantEat: ['향신료', '락토', '락토 오보', '락토 오보 오보'],
    friends: 100,
    completedMeetings: 100,
    uncompletedMeetings: 100,
    posts: [
        {
            id: 1,
            content: '안녕하세요! 서은우입니다.',
            createdAt: '2025-01-01'
        }
    ]
}
type Meeting = {
    id: number
    participants: { name: string; userId: number }[]
    location: string
    time: string
    restaurant: string
    isCompleted: boolean
    restaurantType: string
}

export const MockMeetingList = [
    {
        id: 1,
        participants: [
            { name: '서은우', userId: 1 },
            { name: '유가은', userId: 2 }
        ],
        location: '서울과학기술대학교 정문 앞',
        time: '8월 27일 오후 2:30',
        restaurant: '동학 주점',
        isCompleted: false,
        restaurantType: '한식'
    },
    {
        id: 2,
        participants: [
            { name: '서은우', userId: 1 },
            { name: '유가은', userId: 2 }
        ],
        location: '상상관 1층 앞',
        time: '8월 27일 오후 2:30',
        restaurant: '오하이요',
        isCompleted: false,
        restaurantType: '일식'
    },
    {
        id: 3,
        participants: [
            { name: '서은우', userId: 1 },
            { name: '유가은', userId: 2 }
        ],
        location: '서울과학기술대학교 정문 앞',
        time: '8월 27일 오후 2:30',
        restaurant: '동학 주점',
        isCompleted: true,
        restaurantType: '한식'
    }
]

type Friend = {
    userId: number
    name: string
    lastActive: string
    isHungry: boolean
}
export const MockFriendList = [
    {
        userId: 1,
        name: '유가은',
        lastActive: '2025-01-01 12:00',
        isHungry: true
    },
    {
        userId: 2,
        name: '서은우',
        lastActive: '2025-01-01 12:00',
        isHungry: false
    },
    {
        userId: 3,
        name: '김대규',
        lastActive: '2025-01-01 12:00',
        isHungry: true
    },
    {
        userId: 4,
        name: '김성휘',
        lastActive: '2025-01-01 12:00',
        isHungry: false
    },
    {
        userId: 5,
        name: '이민수',
        lastActive: '2025-01-01 12:00',
        isHungry: true
    },
    {
        userId: 6,
        name: '박소영',
        lastActive: '2025-01-01 12:00',
        isHungry: false
    }
]

export const MockPostList = [
    {
        postId: 1,
        author: '유가은',
        tags: ['김대규', '김성휘', '이민수'],
        postedAt: '1시간 전',
        postImageUrl: '/test/card-post.png',
        postType: 'mornings',
        restaurantInfo: {
            restaurantImageUrl: '/test/post-restaurant.png',
            restaurantName: '더 맛있는 일식집',
            restaurantType: '일식집',
            restaurantLocation: '서울시 노원구 공릉동 30-2',
            restaurantDistance: '300m'
        },
        comments: [
            {
                id: 1,
                profileImageUrl: 'https://picsum.photos/200/300',
                name: '유가은',
                comment: '댓글 1',
                createdAt: '2025-01-01 12:00',
                isReply: false
            },

            {
                id: 2,
                profileImageUrl: 'https://picsum.photos/200/300',
                name: '유가은',
                comment: '댓글 1',
                createdAt: '2025-01-01 12:00',
                isReply: true
            },
            {
                id: 3,
                profileImageUrl: 'https://picsum.photos/200/300',
                name: '유가은',
                comment: '댓글 1',
                createdAt: '2025-01-01 12:00',
                isReply: false
            }
        ]
    },
    {
        postId: 2,
        author: '유가은',
        tags: ['김대규', '김성휘', '이민수', '박소영'],
        postedAt: '2025-01-01 12:00',
        postImageUrl: '/test/card-post.png',
        postType: 'lunch',
        restaurantInfo: {
            restaurantImageUrl: '/test/post-restaurant.png',
            restaurantName: '더 맛있는 일식집',
            restaurantType: '일식집',
            restaurantLocation: '서울시 노원구 공릉동 30-2',
            restaurantDistance: '300m'
        },
        comments: [
            {
                id: 1,
                profileImageUrl: 'https://picsum.photos/200/300',
                name: '유가은',
                comment: '댓글 1',
                createdAt: '2025-01-01 12:00',
                isReply: true
            }
        ]
    },
    {
        postId: 3,
        author: '유가은',
        tags: ['김대규', '김성휘', '이민수', '박소영'],
        postedAt: '2025-01-01 12:00',
        postImageUrl: '/test/card-post.png',
        postType: 'dinner',
        restaurantInfo: {
            restaurantImageUrl: '/test/post-restaurant.png',
            restaurantName: '더 맛있는 일식집',
            restaurantType: '일식집',
            restaurantLocation: '서울시 노원구 공릉동 30-2',
            restaurantDistance: '300m'
        },
        comments: [
            {
                id: 1,
                profileImageUrl: 'https://picsum.photos/200/300',
                name: '유가은',
                comment: '댓글 1',
                createdAt: '2025-01-01 12:00',
                isReply: false
            }
        ]
    },
    {
        postId: 4,
        author: '유가은',
        tags: ['김대규', '김성휘', '이민수', '박소영'],
        postedAt: '2025-01-01 12:00',
        postImageUrl: '/test/card-post.png',
        postType: 'mornings',
        restaurantInfo: {
            restaurantImageUrl: '/test/post-restaurant.png',
            restaurantName: '더 맛있는 일식집',
            restaurantType: '일식집',
            restaurantLocation: '서울시 노원구 공릉동 30-2',
            restaurantDistance: '300m'
        },
        comments: [
            {
                id: 1,
                profileImageUrl: 'https://picsum.photos/200/300',
                name: '유가은',
                comment: '댓글 1',
                createdAt: '2025-01-01 12:00',
                isReply: false
            }
        ]
    }
]
