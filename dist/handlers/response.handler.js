"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseWithData = (res, responseToClient) => res.status(responseToClient.statusCode).json(responseToClient);
const ok = (res, data, message) => responseWithData(res, { data, message, isOk: true, statusCode: 200 });
const created = (res, data, message) => responseWithData(res, { statusCode: 201, data, message, isOk: true });
const unauthenticate = (res) => responseWithData(res, {
    statusCode: 401,
    message: "You have to login!",
    isOk: false,
});
const unauthorize = (res) => responseWithData(res, {
    statusCode: 403,
    message: "You can't do that!",
    isOk: false,
});
const notFound = (res, message) => responseWithData(res, { statusCode: 404, message, isOk: false });
const badRequest = (res, message) => responseWithData(res, { statusCode: 400, message, isOk: false });
const badRequestWithData = (res, message, data) => responseWithData(res, { statusCode: 402, data, message, isOk: false });
const error = (res, error) => responseWithData(res, {
    statusCode: 500,
    data: error,
    message: error.message || "Error in server!",
    isOk: false,
});
const accessTokenExpired = (res) => responseWithData(res, {
    statusCode: 410,
    message: "Need to refresh token",
    isOk: false,
});
const errorOrBadRequest = (res, error) => {
    if (typeof error == "string")
        return responseHandler.badRequest(res, error);
    responseHandler.error(res, error);
};
const responseHandler = {
    errorOrBadRequest,
    accessTokenExpired,
    badRequestWithData,
    ok,
    created,
    unauthenticate,
    unauthorize,
    notFound,
    badRequest,
    error,
};
exports.default = responseHandler;
