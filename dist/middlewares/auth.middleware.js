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
exports.authenticate = void 0;
const response_handler_1 = __importDefault(require("../handlers/response.handler"));
const jwtToken_1 = require("../helpers/jwtToken");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authHeader) {
        return response_handler_1.default.unauthenticate(res);
    }
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;
    try {
        const decode = (0, jwtToken_1.verifyAccessToken)(token);
        req.user = typeof decode === "string" ? decode : decode.data;
        next();
    }
    catch (error) {
        console.log(error);
        if ((_b = error.message) === null || _b === void 0 ? void 0 : _b.includes("jwt expired")) {
            response_handler_1.default.accessTokenExpired(res);
            return;
        }
        response_handler_1.default.error(res, error);
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map