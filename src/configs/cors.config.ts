import { CorsOptions } from 'cors'
import { log } from 'console'

const whitelist = [
    'http://localhost:5173',
    'https://pbl4-video-chat.vercel.app',
    'http://172.188.113.94:5173',
    'http://ducbkdn.space',
    'https://ducbkdn.space',
    'http://www.ducbkdn.space',
    'https://www.ducbkdn.space',
]
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

export default corsOptions
