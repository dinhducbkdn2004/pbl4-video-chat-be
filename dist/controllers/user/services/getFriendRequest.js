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
const pagination_1 = require("../../../helpers/pagination");
const friendRequest_model_1 = __importDefault(require("../../../models/friendRequest.model"));
const getFriendRequests = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, page = "0", limit = "10") {
    const pagination = (0, pagination_1.getPagination)(+page, +limit);
    const friendRequests = yield friendRequest_model_1.default
        .find({
        $or: [{ receiver: userId }],
    })
        .populate("sender", "-account") // Populate sender details
        .populate("receiver", "-account") // Populate receiver details
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort({
        createdAt: -1,
    });
    return friendRequests;
});
exports.default = getFriendRequests;
//# sourceMappingURL=getFriendRequest.js.map