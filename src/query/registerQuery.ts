import { presignProfile, uploadProfileS3 } from '@/apis'
import { useMutation } from '@tanstack/react-query'

type UploadAndRegisterVars = {
    currentUserId: string
    file: File
    // cdnUrl을 받아서 최종 RegisterRequest를 만드는 빌더
    buildRequest: (cdnUrl: string) => {
        imageUrl: string
        username: string
        preferences: string[]
        cantEat: string[]
    }
}

export const useUploadProfile = (
    onSuccess: () => void,
    onError: (e: Error) => void
) => {
    const { mutate, isPending, error } = useMutation({
        mutationFn: async ({
            currentUserId,
            file,
            buildRequest
        }: UploadAndRegisterVars) => {
            // 1) presign
            const { putUrl, cdnUrl } = await presignProfile(
                String(currentUserId),
                file
            )

            // 2) S3 업로드
            await uploadProfileS3({ putUrl, file })

            // 3) Spring에 게시물 생성
            // const req = buildRequest(cdnUrl) // ← imageUrl을 여기서 주입
            // return postRegiter(req)
        },
        onSuccess,
        onError
    })

    return { mutate, isPending, error }
}
