import mongoose from 'mongoose'
import dotenv from 'dotenv'
import envServer from './env'
dotenv.config()
const stringUrl: string = envServer.MONGODB_URL || '123'

const connectDb = async (): Promise<void> => {
    try {
        if (!envServer.MONGODB_URL || envServer.MONGODB_URL === '123') {
            console.error('MONGODB_URL is not configured properly in environment variables')
            return
        }
        
        console.log('Connecting to MongoDB...')
        await mongoose.connect(stringUrl)
        console.log('Connected to MongoDB successfully')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        
        // More detailed error information
        if (error instanceof Error) {
            console.error('Error details:', error.message)
            if ('reason' in error) {
                console.error('Connection failure reason:', (error as any).reason)
            }
        }
    }
}

export default connectDb
