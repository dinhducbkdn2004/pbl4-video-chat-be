import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import { getPresignedUrl } from '../../../helpers/cloudanaryUpload'
import responseHandler from '../../../handlers/response.handler'

const uploadRoute: Router = Router()

uploadRoute.post('/get-presigned-url', authenticate, async (req: Request, res: Response) => {
    try {
        const { folder, fileName } = req.body as {
            folder: string
            fileName: string
        }
        const url = getPresignedUrl(folder, fileName)
        responseHandler.ok(res, url, 'Lấy url thành công')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default uploadRoute
