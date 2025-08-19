import { create } from 'zustand'

interface PhaseDataBroadcastPayload {
    phase: number
    data: any
}

interface UserInfo {
    userId: string
    username: string
}
interface MatchStore {
    roomInfo: {
        roomId: string
        roomUsers: UserInfo[]
    }
    phase: number
    phaseData: PhaseDataBroadcastPayload | null
    setRoomInfo: (roomUsers: UserInfo[]) => void
    setPhase: (phase: number) => void
    setPhaseData: (phaseData: PhaseDataBroadcastPayload) => void
}

export const useMatchStore = create<MatchStore>(set => ({
    roomInfo: {
        roomId: '',
        roomUsers: []
    },
    phase: 0,
    phaseData: null,
    setRoomInfo: roomUsers =>
        set({ roomInfo: { ...useMatchStore.getState().roomInfo, roomUsers } }),
    setPhase: phase => set({ phase }),
    setPhaseData: phaseData => set({ phaseData })
}))
