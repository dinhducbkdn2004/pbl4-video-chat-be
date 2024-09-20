import createMessage from './services/createMessage'
import getMessagesByChatRoomId from './services/getMessageByRoomId'

const messageService = {
    createMessage,
    getMessagesByChatRoomId
}
export default messageService
