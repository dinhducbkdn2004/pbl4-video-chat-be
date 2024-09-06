"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const model_config_1 = __importDefault(require("../configs/model.config"));
const NotificationSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    type: {
        type: String,
        enum: ["MESSAGE", "FRIEND_REQUEST"],
        required: true,
    },
    message: { type: String },
    isRead: { type: Boolean, default: false },
}, model_config_1.default);
const notificationModel = mongoose_1.default.model("Notifications", NotificationSchema);
exports.default = notificationModel;
//# sourceMappingURL=notification.model.js.map