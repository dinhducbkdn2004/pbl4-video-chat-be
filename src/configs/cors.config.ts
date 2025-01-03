import { CorsOptions } from 'cors'
import { log } from 'console'

const whitelist = [
    'http://localhost:5173',
    'https://pbl4-video-chat-fe.onrender.com',
    'http://192.168.64.1:5173',
    'http://172.20.10.13:5173',
    'https://phuocnguyn.id.vn'
]
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

export default corsOptions
