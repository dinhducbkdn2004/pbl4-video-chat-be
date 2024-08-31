import mongoose from "mongoose";
import modelOption from "../configs/model.config";

const ChatRoomSchema = new mongoose.Schema(
    {
        name: { type: String },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
                required: true,
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Messages",
                default: [],
            },
        ],
        isGroupChat: { type: Boolean, default: false },
    },
    modelOption
);

const chatRoomModel = mongoose.model("ChatRooms", ChatRoomSchema);
export default chatRoomModel;
