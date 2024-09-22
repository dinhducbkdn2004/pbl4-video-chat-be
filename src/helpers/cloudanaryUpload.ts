import cloudinary from '../configs/cloudinary.config'
import dotenv from 'dotenv'

dotenv.config()

export const getPresignedUrl = (folder: string) => {
    const timestamp = Math.round(new Date().getTime() / 1000) // Unix timestamp

    // Generate a signature using Cloudinary SDK
    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder },
        process.env.CLOUDINARY_API_SECRET || '' // Your Cloudinary API secret
    )

    // Send the signature and required details back to the client
    return {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder
    }
}
