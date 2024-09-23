import mongoose from 'mongoose'
import modelOption from '../../../configs/model.config'

const UserSchema = new mongoose.Schema(
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
        backgroundImage: { type: String, default: '' },
        introduction: { type: String, default: '' },
        isOnline: { type: Boolean },
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
        account: {
            type: {
                password: { type: String },
                otp: {
                    type: String,
                    default: null
                },
                otpExp: {
                    type: Date,
                    default: null
                },
                otpWrongCount: {
                    type: Number,
                    default: 0
                },
                isVerified: {
                    type: Boolean,
                    default: false
                }, // xác nhận tài khoản đã chưa xác thực email
                loginType: {
                    type: String,
                    enum: ['GOOGLE', 'SYSTEM'], // Sử dụng enum để giới hạn các giá trị hợp lệ
                    required: true
                },
                otpAttempts: {
                    type: Number,
                    default: 0
                },
                otpLockUntil: Date
            },
            required: true
        }
    },
    modelOption
)
const userModel = mongoose.model('Users', UserSchema)
export default userModel
