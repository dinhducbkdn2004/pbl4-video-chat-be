import { Response } from "express";
interface ResponseToClient {
    statusCode: number;
    data?: any;
    message: string;
    isOk: boolean;
}
const responseWithData = (res: Response, responseToClient: ResponseToClient) =>
    res.status(responseToClient.statusCode).json(responseToClient);

const ok = (res: Response, data: object | Array<object>, message: string) =>
    responseWithData(res, { data, message, isOk: true, statusCode: 200 });

const created = (
    res: Response,
    data: object | Array<object>,
    message: string
) => responseWithData(res, { statusCode: 201, data, message, isOk: true });

const unauthenticate = (res: Response) =>
    responseWithData(res, {
        statusCode: 401,
        message: "You have to login!",
        isOk: false,
    });

const unauthorize = (res: Response) =>
    responseWithData(res, {
        statusCode: 403,
        message: "You can't do that!",
        isOk: false,
    });

const notFound = (res: Response, message: string) =>
    responseWithData(res, { statusCode: 404, message, isOk: false });

const badRequest = (res: Response, message: string) =>
    responseWithData(res, { statusCode: 400, message, isOk: false });

const badRequestWithData = (
    res: Response,
    message: string,
    data: object | Array<object>
) => responseWithData(res, { statusCode: 402, data, message, isOk: false });

const error = (res: Response, error: any) =>
    responseWithData(res, {
        statusCode: 500,
        data: error,
        message: error.message || "Error in server!",
        isOk: false,
    });

const accessTokenExpired = (res: Response) =>
    responseWithData(res, {
        statusCode: 410,
        message: "Need to refresh token",
        isOk: false,
    });
const errorOrBadRequest = (res: Response, error: any) => {
    if (typeof error == "string") return responseHandler.badRequest(res, error);
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
export default responseHandler;
