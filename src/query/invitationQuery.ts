import { useMutation, useQuery } from '@tanstack/react-query'
import {
    acceptInvitation,
    getInvitations,
    rejectInvitation,
    sendInvitation
} from '@/apis'

export const useGetInvitations = () => {
    return useQuery({
        queryKey: ['invitations'],
        queryFn: getInvitations
    })
}

export const useSendInvitation = ({
    onSuccess,
    onError
}: {
    onSuccess: () => void
    onError: () => void
}) => {
    return useMutation({
        mutationFn: sendInvitation,
        onSuccess,
        onError
    })
}

export const useAcceptInvitation = ({
    onSuccess,
    onError
}: {
    onSuccess: () => void
    onError: () => void
}) => {
    return useMutation({
        mutationFn: acceptInvitation,
        onSuccess,
        onError
    })
}

export const useRejectInvitation = ({
    onSuccess,
    onError
}: {
    onSuccess: () => void
    onError: () => void
}) => {
    return useMutation({
        mutationFn: rejectInvitation,
        onSuccess,
        onError
    })
}
