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
const friendRequest_model_1 = __importDefault(require("../../../models/friendRequest.model"));
const sendAddFriendRequest = (senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    yield friendRequest_model_1.default.create({
        sender: senderId,
        receiver: receiverId,
        status: "PENDING",
    });
    const newRequest = yield friendRequest_model_1.default
        .findOne({
        sender: senderId,
        receiver: receiverId,
        status: "PENDING",
    })
        .populate("sender", "-account") // Populate sender details
        .populate("receiver", "-account");
    return newRequest;
});
exports.default = sendAddFriendRequest;
//# sourceMappingURL=addFriendRequest.js.map