// Types for matching announcements
import { MatchingAnnouncement } from '@/types'
export const mockAnnouncements: MatchingAnnouncement[] = [
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

export const userProfile = {
    name: '서은우',
    profileImage: '/src/assets/icons/icon_profile_default.svg',
    description: '기억이 아닌 추억으로',
    preferredMenus: ['한식', '일식', '양식', '분식'],
    cantEat: ['향신료', '락토', '락토 오보', '락토 오보 오보']
}
export const couponList = [
    {
        isUsed: true,
        name: '동학 주점',
        discount: 2000,
        expirationDate: '2025년 9월 16일까지'
    },
    {
        isUsed: true,
        name: '동학 주점',
        discount: 2000,
        expirationDate: '2025년 9월 16일까지'
    },
    {
        isUsed: true,
        name: '동학 주점',
        discount: 2000,
        expirationDate: '2025년 9월 16일까지'
    },
    {
        isUsed: true,
        name: '동학 주점',
        discount: 2000,
        expirationDate: '2025년 9월 16일까지'
    }
]
export const mockMatchingInviteNotis = [
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
export const mockLocalNewsNotis = [
    {
        id: 2,
        type: 'local',
        title: '여기 꼬치네 공릉역점',
        time: '20분 전',
        message: '여름 방학 맞이 사장님이 아이스크림 쏜다!',
        period: '~2025.8.31까지 · 진행중',
        imageUrl: '' // TODO: add image if needed
    },
    {
        id: 3,
        type: 'local',
        title: '여기 꼬치네 공릉역점',
        time: '20분 전',
        message: '여름 방학 맞이 사장님이 아이스크림 쏜다!',
        period: '~2025.6.31까지 · 종료',
        imageUrl: ''
    }
]
