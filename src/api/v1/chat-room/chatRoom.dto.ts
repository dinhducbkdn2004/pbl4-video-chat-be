export interface searchChatroom {
    name: string
    page?: string
    limit?: string
}

export interface createChatRoom {
    name?: string
    users: string[]
}
