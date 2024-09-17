import mongoose from 'mongoose';
import modelOption from '../configs/model.config';

const ChatRoomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                required: true
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Messages',
                default: []
            }
        ],
        isGroupChat: { type: Boolean, default: false },
        typeRoom: {
            type: String,
            enum: ['PUBLIC', 'PRIVATE'],
            required: true,
            default: 'PRIVATE'
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages'
        }
    },
    modelOption
);

const chatRoomModel = mongoose.model('ChatRooms', ChatRoomSchema);
export default chatRoomModel;
