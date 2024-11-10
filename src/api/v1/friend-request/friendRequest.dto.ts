export interface CreateFriendRequestDto {
    caption: string
    friendId: string
}
export interface UpdateFriendRequestDto {
    requestId: string
    status: 'ACCEPTED' | 'DECLINED'
}

export type UpdateFriendRequestParams = {
    requestId: string
}
