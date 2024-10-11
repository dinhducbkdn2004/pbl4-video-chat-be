import createChatRoom from './services/createChatRoom'
import { getOneToOneChatRoom } from './services/getOneToOneChatRoom'
import searchChatRooms from './services/searchChatroom'
import getMessagesByChatRoomId from '../message/services/getMessageByRoomId'
import { getChatRoomById } from './services/getChatRoomById'
import addMember from './services/addMember'
import removeMember from './services/removeMember'
import changeDetails from './services/changeDetails'
import leaveGroup from './services/leaveGroup'
import changeRole from './services/changeRole'

const chatRoomService = {
    searchChatRooms,
    createChatRoom,
    getOneToOneChatRoom,
    getChatRoomById,
    addMember,
    removeMember,
    changeDetails,
    leaveGroup,
    changeRole
}
export default chatRoomService
