export interface CreateMesssage {
    content: string
    chatRoomId: string
    type: 'Text' | 'Media' | 'Document' | 'Link'
    file?: string
}