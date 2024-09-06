"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app_config_1 = __importDefault(require("./configs/app.config"));
const database_config_1 = __importDefault(require("./configs/database.config"));
const env_1 = __importDefault(require("./configs/env"));
const socket_1 = __importDefault(require("./socket"));
const app = (0, express_1.default)();
const PORT = env_1.default.PORT || 3000;
const httpServer = (0, http_1.createServer)(app);
(0, database_config_1.default)();
(0, app_config_1.default)(app);
(0, socket_1.default)(httpServer);
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map