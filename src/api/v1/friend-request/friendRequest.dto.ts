export interface CreateFriendRequestDto {
    caption: string
    friendId: string
}
export interface UpdateFriendRequestDto {
    status: 'ACCEPTED' | 'DECLINED'
    friendId: string
}
