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
const cors_1 = __importDefault(require("cors"));
const cors_config_1 = __importDefault(require("./cors.config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("../routes"));
const morgan_1 = __importDefault(require("morgan"));
const configApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, cors_1.default)(cors_config_1.default));
    app.options("*", (0, cors_1.default)(cors_config_1.default));
    app.use((0, cookie_parser_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)(":method :status - :response-time ms"));
    app.get("/", (_, res) => {
        res.send("Hello world from the API!");
    });
    // API routes
    app.use("/api/v1", routes_1.default);
});
exports.default = configApp;
//# sourceMappingURL=app.config.js.map