import { getPagination } from '../../../helpers/pagination';
import chatRoomModel from '../../../models/chatRoom.model';

const searchChatRooms = async (name: string, page: number = 1, limit = 10, type?: 'PUBLIC' | 'PRIVATE') => {
    const pagination = getPagination(page, limit);

    type SearchOption = {
        name: RegExp;
        typeRoom?: 'PUBLIC' | 'PRIVATE';
    };

    const searchOption: SearchOption = {
        name: new RegExp(name, 'i')
    };

    if (type) searchOption.typeRoom = type;

    const chatRooms = await chatRoomModel
        .find(searchOption)
        .select('name isGroupChat participants')
        .populate('participants', 'name avatar')
        .skip(pagination.limit)
        .limit(pagination.skip);

    return chatRooms;
};

// const getChatRoomDetails = async (chatRoomId: string) => {
//   const chatRoom = await chatRoomModel
//     .findById(chatRoomId)
//     .populate("participants", "_id name avatar")
//     .populate("messages");

//   if (!chatRoom) throw new Error("Phòng chat không tồn tại!");

//   return chatRoom;
// };

export default searchChatRooms;
