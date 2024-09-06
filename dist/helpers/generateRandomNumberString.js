"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomNumberString(length = 6) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    return result;
}
exports.default = generateRandomNumberString;
