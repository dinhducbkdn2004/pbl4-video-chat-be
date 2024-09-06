"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const model_config_1 = __importDefault(require("../configs/model.config"));
const ChatRoomSchema = new mongoose_1.default.Schema({
    name: { type: String },
    participants: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    ],
    messages: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Messages",
            default: [],
        },
    ],
    isGroupChat: { type: Boolean, default: false },
}, model_config_1.default);
const chatRoomModel = mongoose_1.default.model("ChatRooms", ChatRoomSchema);
exports.default = chatRoomModel;
//# sourceMappingURL=chatRoom.model.js.map