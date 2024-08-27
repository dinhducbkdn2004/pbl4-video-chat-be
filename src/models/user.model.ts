import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: {
        type: String,
        required: true,
        default:
            "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
    },
    account: {
        password: { type: String, required: true },

        otp: {
            type: String,
            default: null,
        },

        otpExp: {
            type: Date,
            default: null,
        },
        otpLeft: {
            type: Number,
            default: 5,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
        
        loginType: {
            type: String,
            enum: ["GOOGLE", "SYSTEM"], // Sử dụng enum để giới hạn các giá trị hợp lệ
            required: true,
        },
    },
});
const User = mongoose.model("User", UserSchema, "users");
export default User;
