"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const friendRequest_model_1 = __importDefault(require("../../../models/friendRequest.model"));
const user_model_1 = __importDefault(require("../../../models/user.model"));
const updateFriendRequest = (senderId, receiverId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const senderUser = yield user_model_1.default.findById(senderId);
    const receiverUser = yield user_model_1.default.findById(receiverId);
    if (senderUser === null || receiverUser === null)
        throw "Không tồn tại sender hoặc receiver";
    const newRequest = yield friendRequest_model_1.default.findOneAndUpdate({
        sender: senderId,
        receiver: receiverId,
    }, {
        status,
    }, { new: true } // This option returns the updated document
    );
    if (newRequest === null)
        throw "Không tồn tại request để update !";
    if (status === "ACCEPTED") {
        senderUser.friends.push(new mongoose_1.default.Types.ObjectId(receiverId));
        receiverUser.friends.push(new mongoose_1.default.Types.ObjectId(senderId));
        yield senderUser.save();
        yield receiverUser.save();
    }
    const data = yield friendRequest_model_1.default
        .findOne({
        sender: senderId,
        receiver: receiverId,
        status,
    })
        .populate("sender", "-account") // Populate sender details
        .populate("receiver", "-account");
    if (data === null)
        throw "Không tồi tại request để get";
    return data;
});
exports.default = updateFriendRequest;
