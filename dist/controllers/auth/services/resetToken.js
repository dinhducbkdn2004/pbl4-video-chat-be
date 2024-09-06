"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resetToken;
const jwtToken_1 = require("../../../helpers/jwtToken");
function resetToken(refreshToken) {
    const decodeToken = (0, jwtToken_1.verifyRefreshToken)(refreshToken);
    const newAccessToken = (0, jwtToken_1.generateAccessToken)(typeof decodeToken === "string" ? decodeToken : decodeToken.data);
    return newAccessToken;
}
//# sourceMappingURL=resetToken.js.map