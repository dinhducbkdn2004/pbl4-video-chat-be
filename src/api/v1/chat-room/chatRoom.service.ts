import createChatRoom from './services/createChatRoom'
import { getOneToOneChatRoom } from './services/getOneToOneChatRoom'
import searchChatRooms from './services/searchChatroom'

const chatRoomService = {
    searchChatRooms,
    createChatRoom,
    getOneToOneChatRoom
}
export default chatRoomService
