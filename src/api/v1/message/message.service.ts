import createMessage from './services/createMessage'
import getMessagesByChatRoomId from './services/getMessageByRoomId'
import getMDL from './services/getMDL'
import seenMessage from './services/seenMessage'

const messageService = {
    createMessage,
    getMessagesByChatRoomId,
    getMDL,
    seenMessage
}
export default messageService
