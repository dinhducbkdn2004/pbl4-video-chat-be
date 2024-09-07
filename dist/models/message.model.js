"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const model_config_1 = __importDefault(require("../configs/model.config"));
const MessageSchema = new mongoose_1.default.Schema({
    chatRoom: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ChatRooms",
        required: true,
    },
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false }, // Message read status
}, model_config_1.default);
const messageModel = mongoose_1.default.model("Messages", MessageSchema);
exports.default = messageModel;
//# sourceMappingURL=message.model.js.map