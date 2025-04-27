import { CorsOptions } from 'cors'
import { log } from 'console'

const whitelist = [
    'http://localhost:5173',
    'https://pbl4-video-chat.vercel.app',
    'http://192.168.179.69:3000',
    'http://172.188.113.94:3000',
    'http://ducbkdn.space',
    'https://ducbkdn.space'
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
