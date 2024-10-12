import createMessage from './services/createMessage'
import getMessagesByChatRoomId from './services/getMessageByRoomId'
import getMDL from './services/getMDL'

const messageService = {
    createMessage,
    getMessagesByChatRoomId,
    getMDL
}
export default messageService
