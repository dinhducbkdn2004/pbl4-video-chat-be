import mongoose, { Types } from 'mongoose'
import modelOption from '../../../configs/model.config'

export type LoginType = 'GOOGLE' | 'SYSTEM'
export interface IUser {
    _id: Types.ObjectId
    name: string
    email: string
    avatar: string
    friends: Types.ObjectId[]
    sentRequests: Types.ObjectId[]
    receivedRequests: Types.ObjectId[]
    backgroundImage: string
    introduction: string
    isOnline: boolean
    socketId: string[]
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
        otpLockUntil: Date | null
    }
}
const UserSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        avatar: {
            type: String,
            required: true,
            default: 'https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg'
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                default: []
            }
        ],
        sentRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                default: []
            }
        ],
        receivedRequests: [
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
        socketId: { type: [String], default: [], required: true },
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
                    default: null,
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
