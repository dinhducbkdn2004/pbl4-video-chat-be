"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = getPagination;
function getPagination(page = 1, limit = 10) {
    const currentPage = Math.max(1, page);
    const maxLimit = Math.max(1, limit);
    const skip = (currentPage - 1) * maxLimit;
    return {
        skip,
        limit: maxLimit,
    };
}
//# sourceMappingURL=pagination.js.map