import { NextFunction, Request, Response } from 'express'
import responseHandler from '../handlers/response.handler'
import { verifyAccessToken } from '../helpers/jwtToken'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization

    if (!authHeader) {
        return responseHandler.unauthenticate(res)
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader

    try {
        const decoded = verifyAccessToken(token)

        if (!Types.ObjectId.isValid((decoded as JwtPayload).data.userId)) throw 'Invalid friendId'

        if (typeof decoded !== 'string' && (decoded as JwtPayload).data) {
            req.user = (decoded as JwtPayload).data
        }

        next()
    } catch (error: any) {
        if (error.message?.includes('jwt expired')) {
            return responseHandler.accessTokenExpired(res)
        }

        return responseHandler.error(res, error)
    }
}
