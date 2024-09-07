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
const jwtToken_1 = require("../helpers/jwtToken");
const user_service_1 = __importDefault(require("../controllers/user/services/user.service"));
const authSocket = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = socket.handshake.headers.authorization;
    if (!accessToken)
        throw new Error("No authentication");
    const decode = (0, jwtToken_1.verifyAccessToken)(accessToken);
    const { userId } = typeof decode === "string" ? { userId: decode } : decode.data;
    const user = yield user_service_1.default.getUser(userId);
    return user;
});
exports.default = authSocket;
//# sourceMappingURL=authSocket.js.map