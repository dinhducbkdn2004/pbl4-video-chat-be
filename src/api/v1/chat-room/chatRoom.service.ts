import createChatRoom from './services/createChatRoom'
import { getOneToOneChatRoom } from './services/getOneToOneChatRoom'
import searchChatRooms from './services/searchChatroom'
import getMessagesByChatRoomId from '../message/services/getMessageByRoomId'
import { getChatRoomById } from './services/getChatRoomById'

const chatRoomService = {
    searchChatRooms,
    createChatRoom,
    getOneToOneChatRoom,
    getChatRoomById,
}
export default chatRoomService
