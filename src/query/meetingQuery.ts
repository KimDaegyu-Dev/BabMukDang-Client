import { useQuery } from '@tanstack/react-query'
import { getMeetings } from '@/apis/meeting'

export const useGetMeetings = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['meetings'],
        queryFn: getMeetings
    })
    return { data: data?.data, isLoading, error, refetch }
}
