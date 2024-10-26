import mongoose, { Types } from 'mongoose'
import modelOption from '../../../configs/model.config'

export type LoginType = 'GOOGLE' | 'SYSTEM'
export interface IUser {
    _id: Types.ObjectId
    name: string
    email: string
    avatar: string
    friends: Types.ObjectId[]
    backgroundImage: string
    introduction: string
    isOnline: boolean
    socketId: string
    chatRooms: Types.ObjectId[]
    notifications: Types.ObjectId[]
    isCalling: boolean
    account: {
        password: string
        otp: string
        otpExp: Date
        otpWrongCount: number
        isVerified: boolean
        loginType: LoginType
        otpAttempts: number
        otpLockUntil?: Date
    }
}
const UserSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        avatar: {
            type: String,
            required: true,
            default: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                default: []
            }
        ],
        backgroundImage: {
            type: String,
            default: 'https://cdn.trendhunterstatic.com/thumbs/human-facebook-default-avatar.jpeg?auto=webp'
        },
        introduction: { type: String, default: '' },
        isOnline: { type: Boolean, required: true, default: false },
        socketId: { type: String },
        chatRooms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ChatRooms',
                default: []
            }
        ],
        notifications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Notifications',
                default: []
            }
        ],
        isCalling: {
            require: true,
            type: Boolean,
            default: false
        },
        account: {
            type: {
                password: { type: String },
                otp: {
                    type: String,
                    default: null
                },
                otpExp: {
                    type: Date,
                    default: Date.now()
                },
                otpWrongCount: {
                    type: Number,
                    default: 0
                },
                isVerified: {
                    type: Boolean,
                    default: false
                },
                loginType: {
                    type: String,
                    enum: ['GOOGLE', 'SYSTEM'],
                    required: true
                },
                otpAttempts: {
                    type: Number,
                    default: 0
                },
                otpLockUntil: {
                    type: Date
                }
            },
            required: true
        }
    },
    modelOption
)
const userModel = mongoose.model<IUser>('Users', UserSchema)
export default userModel
