import { TypeRoom } from './chatRoom.model'

export interface searchChatroomQueryParams {
    name?: string
    page: string
    limit: string
    privacy?: 'PUBLIC' | 'PRIVATE'
    getMy?: string
    typeRoom?: TypeRoom
}

export interface createChatRoom {
    name?: string
    users: string[]
    privacy: 'PUBLIC' | 'PRIVATE'
}
