"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth/auth.controller"));
const user_controller_1 = __importDefault(require("../controllers/user/user.controller"));
const routes = (0, express_1.Router)();
routes.get("/hello-world", (_, res) => {
    res.send("Hello world from the API!");
});
routes.use("/auth", auth_controller_1.default);
routes.use("/users", user_controller_1.default);
exports.default = routes;
