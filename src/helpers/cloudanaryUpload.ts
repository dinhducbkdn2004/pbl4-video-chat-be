import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUNDINARY_API_KEY || '',
    api_secret: process.env.CLOUNDINARY_API_SECRE || ''
});
export const getPresignedUrl = (publicId: string, folder: string): string => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
            folder: folder,
            public_id: publicId
        },
        process.env.API_SECRET || ''
    );

    const url = cloudinary.utils.url(publicId, {
        resource_type: 'auto',
        folder: folder,
        sign_url: true,
        secure: true,
        timestamp: timestamp,
        signature: signature,
        api_key: process.env.API_KEY || ''
    });

    return url;
};
