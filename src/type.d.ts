// types.d.ts
import { JwtPayload } from 'jsonwebtoken'

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload // You can modify the type of `user` depending on your needs.
    }
}
