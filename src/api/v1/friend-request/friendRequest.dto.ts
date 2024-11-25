export interface CreateFriendRequestDto {
    caption: string
    friendId: string
}
export interface UpdateFriendRequestDto {
    requestId: string
    status: 'ACCEPTED' | 'DECLINED'
    action: 'UPDATE' | 'REVOKE'
}

export type UpdateFriendRequestParams = {
    requestId: string
}
