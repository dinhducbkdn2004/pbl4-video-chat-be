import cloudinary from '../configs/cloudinary.config'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

export const getPresignedUrl = (folder: string, fileName: string) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const uniqueFileName = `${fileName}_${uuidv4()}` 

    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder, public_id: uniqueFileName },
        process.env.CLOUDINARY_API_SECRET || ''
    )

    return {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder,
        public_id: uniqueFileName
    }
}
