import { client } from './client'
import { BaseResponse } from './dto'

export interface InvitationPostRequest {
    inviteeId: {
        id: number
    }
    message: string
}

export interface InvitationResponse {
    invitationId: number
    inviterName: string
    inviterProfileImageUrl?: string
}

export const rejectInvitation = async (
    invitationId: number
): Promise<BaseResponse<void>> => {
    const response = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/invitations/${invitationId}/reject`
    )
    return response.data
}

export const acceptInvitation = async (
    invitationId: number
): Promise<BaseResponse<void>> => {
    const response = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/invitations/${invitationId}/accept`
    )
    return response.data
}

export const sendInvitation = async (
    data: InvitationPostRequest
): Promise<BaseResponse<void>> => {
    const response = await client.post(
        `${import.meta.env.VITE_BASE_API_URL}/invitations/send`,
        data
    )
    return response.data
}

export const getInvitations = async (): Promise<
    BaseResponse<InvitationResponse[]>
> => {
    const response = await client.get(
        `${import.meta.env.VITE_BASE_API_URL}/invitations`
    )
    return response.data
}
