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
const response_handler_1 = __importDefault(require("../../handlers/response.handler"));
const user_service_1 = __importDefault(require("./services/user.service"));
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const express_validator_1 = require("express-validator");
const validation_handler_1 = require("../../handlers/validation.handler");
const userRoute = (0, express_1.Router)();
userRoute.get("/me", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const user = yield user_service_1.default.getMe(userId);
        response_handler_1.default.ok(res, user, `Hello ${user.name}, welcome back!`);
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
userRoute.post("/send-add-friend-request/:friendId", auth_middleware_1.authenticate, [
    (0, express_validator_1.param)("friendId")
        .notEmpty()
        .withMessage("thiếu trường friendId")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.default.getMe(value);
        if (!user)
            throw "Không tồi tại người dùng để kết bạn";
    })),
], validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { friendId } = req.params;
        const isSuccess = user_service_1.default.sendAddFriendRequest(userId, friendId);
        response_handler_1.default.ok(res, { isSuccess }, "Add friend successfully!");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
userRoute.put("/update-friend-request/:friendId", auth_middleware_1.authenticate, [
    (0, express_validator_1.param)("friendId")
        .notEmpty()
        .withMessage("thiếu trường friendId")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.default.getMe(value);
        if (!user)
            throw "Không tồi tại người dùng để kết bạn";
    })),
    // query("status")
    //     .notEmpty()
    //     .withMessage("Thiếu trường status")
    //     .custom((value: string) => {
    //         const isCheck =
    //             value === "PENDING" ||
    //             value === "ACCEPTED" ||
    //             value === "DECLINED";
    //         if (!isCheck)
    //             throw "trường status phải có giá trị PENDING hoặc ACCEPTED hoặc DECLINED";
    //     }),
], validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { friendId } = req.params;
        const { status } = req.query;
        const data = yield user_service_1.default.updateFriendRequest(userId, friendId, status);
        response_handler_1.default.ok(res, data, "update friend request successfully!");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
userRoute.get("/friend-request", auth_middleware_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { page, limit } = req.query;
        const data = yield user_service_1.default.getFriendRequests(userId, page, limit);
        response_handler_1.default.ok(res, data, "get friend request successfully!");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
exports.default = userRoute;
//# sourceMappingURL=user.controller.js.map