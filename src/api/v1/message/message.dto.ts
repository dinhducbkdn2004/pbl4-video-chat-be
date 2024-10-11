import { MessageType } from './message.model'

export interface CreateMesssage {
    content?: string
    chatRoomId: string
    type: MessageType
    file?: string
}
