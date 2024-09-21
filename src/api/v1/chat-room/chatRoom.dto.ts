export interface searchChatroomQueryParams {
    name?: string
    page: string
    limit: string
    typeRoom?: 'PUBLIC' | 'PRIVATE'
    getMy?: string
}

export interface createChatRoom {
    name?: string
    users: string[]
}
