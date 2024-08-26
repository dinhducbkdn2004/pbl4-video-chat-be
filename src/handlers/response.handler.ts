import { Response } from "express";

const responseWithData = (
    res: Response,
    statusCode: number,
    data: any,
    message: string,
    isOk: boolean
) => {
    console.log(data);
    return res.status(statusCode).json({ isOk, data, message, statusCode });
};

const ok = (res: Response, data: object | Array<object>, message: string) =>
    responseWithData(res, 200, data, message, true);

const created = (
    res: Response,
    data: object | Array<object>,
    message: string
) => responseWithData(res, 201, data, message, true);

const unauthenticate = (res: Response) =>
    responseWithData(res, 401, {}, "You have to login!", false);

const unauthorize = (res: Response) =>
    responseWithData(res, 403, {}, "You can't do that!", false);

const notFound = (res: Response, message: string) =>
    responseWithData(res, 404, [], message, false);

const badRequest = (res: Response, message: string) =>
    responseWithData(res, 400, {}, message, false);

const badRequestWithData = (
    res: Response,
    message: string,
    data: object | Array<object>
) => responseWithData(res, 402, data, message, false);

const error = (res: Response, error: any) =>
    responseWithData(res, 500, error, "Error in server!", false);

const accessTokenExpired = (res: Response) =>
    responseWithData(res, 410, {}, "Need to refresh token!!!!", false);

const responseHandler = {
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
