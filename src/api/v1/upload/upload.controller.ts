import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import { getPresignedUrl } from '../../../helpers/cloudanaryUpload'
import responseHandler from '../../../handlers/response.handler'

const uploadRoute: Router = Router()

uploadRoute.post('/get-presigned-url', authenticate, async (req: Request, res: Response) => {
    try {
        const { publicId, folder } = req.body as {
            publicId: string
            folder: string
        }
        const url = getPresignedUrl(publicId, folder)
        responseHandler.ok(res, { url }, 'Lấy url thành công')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default uploadRoute
