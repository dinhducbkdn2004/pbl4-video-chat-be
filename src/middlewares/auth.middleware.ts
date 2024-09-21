import { NextFunction, Request, Response } from 'express'
import responseHandler from '../handlers/response.handler'
import { verifyAccessToken } from '../helpers/jwtToken'
import { JwtPayload } from 'jsonwebtoken'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization

    if (!authHeader) {
        return responseHandler.unauthenticate(res)
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader

    try {
        const decoded = verifyAccessToken(token)

        if (typeof decoded !== 'string' && (decoded as JwtPayload).data) {
            req.user = (decoded as JwtPayload).data
        }

        next()
    } catch (error: any) {
        console.log(error)

        if (error.message?.includes('jwt expired')) {
            responseHandler.accessTokenExpired(res)
            return
        }

        responseHandler.error(res, error)
    }
}
