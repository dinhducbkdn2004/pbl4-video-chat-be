import createChatRoom from './services/createChatRoom'
import { getOneToOneChatRoom } from './services/getOneToOneChatRoom'
import searchChatRooms from './services/searchChatroom'
import getMessagesByChatRoomId from '../message/services/getMessageByRoomId'
import { getChatRoomById } from './services/getChatRoomById'
import addMember from './services/group/addMember'
import removeMember from './services/group/removeMember'
import changeRole from './services/group/changeRole'
import changeDetails from './services/group/changeDetails'
import leaveGroup from './services/group/leaveGroup'

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
